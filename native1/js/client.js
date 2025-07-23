var MFTools = typeof MFTools !== 'undefined'
    ? MFTools
    : {
        getURLParameters(url = window.location.href) {
            return (url.split('?')[1] || '')
                .split('&')
                .reduce((params, param) => {
                    const [key, value] = param.split('=').map(decodeURIComponent);
                    if (key) params[key] = value;
                    return params;
                }, {});
        },

        getElementValueOrDefault(elementId, defaultValue) {
            const element = document.getElementById(elementId);
            return element && element.value ? element.value : defaultValue;
        },

        getURLParameter(name, url = window.location.href) {
            const params = MFTools.getURLParameters(url);
            return params[name];
        },

        getCookie: function (name) {
            const cookies = document.cookie.split("; ");
            for (const cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split("=");
                if (cookieName === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            return null;
        },

        setCookie: function (name, value) {
            document.cookie = `${name}=${encodeURIComponent(value)}`;
        },

        getUrlWithUpdatedParameter: function (url, paramName, newValue) {
            const urlObject = new URL(url);
            urlObject.searchParams.set(paramName, newValue);
            return urlObject.toString();
        },

        updateOutlinksWithMfSessionId: function(paramName, paramValue) {
            const outlinks = document.querySelectorAll('a.leave-behind, a.outlink');
            outlinks.forEach(function(link) {
                link.href = MFTools.getUrlWithUpdatedParameter(link.href, paramName, paramValue);
            });
        }
    };

var mfSession = typeof mfSession !== 'undefined'
    ? mfSession
    : {
        getSessionId: function () {
            const sessionIdFromUrl = MFTools.getURLParameter("mfsid");
            if (this.isValidSessionId(sessionIdFromUrl)) {
                MFTools.setCookie("mfSessionId", sessionIdFromUrl);
                return sessionIdFromUrl;
            }

            const sessionIdCookie = MFTools.getCookie("mfSessionId");
            if (this.isValidSessionId(sessionIdCookie)) {
                return sessionIdCookie;
            }

            const newSessionId = this.generateSessionId();
            MFTools.setCookie("mfSessionId", newSessionId);
            return newSessionId;
        },

        isValidSessionId: function (sessionId) {
            const hexRegex = /^[0-9a-f]{32}$/i;
            return hexRegex.test(sessionId);
        },

        getTransactionId: function () {
            const transactionIdCookie = MFTools.getCookie("transaction_id");

            if (transactionIdCookie) {
                return transactionIdCookie;
            } else {
                const newTransactionId = MFTools.getURLParameter('transaction_id');
                if (newTransactionId != undefined) {
                    MFTools.setCookie("transaction_id", newTransactionId);
                }
                return newTransactionId;
            }
        },

        generateSessionId: function () {
            const randomBytes = new Uint8Array(16);
            crypto.getRandomValues(randomBytes);
            const sessionId = Array.from(randomBytes, (byte) =>
                byte.toString(16).padStart(2, '0')
            ).join('');
            return sessionId;
        }
    };

mfSession.id = mfSession.id ? mfSession.id : mfSession.getSessionId();
mfSession.transaction_id = mfSession.transaction_id ? mfSession.transaction_id :  mfSession.getTransactionId();

var SDSS = typeof SDSS !== 'undefined'
    ? SDSS
    : {
        sha256: async function(text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        },

        mergePayloads(payload1, payload2) {
            return { ...payload1, ...payload2 };
        },

        buildPayload(typeOrPayload, data) {
            const payload = typeof typeOrPayload === "string" ?
                { type: typeOrPayload, data } :
                this.mergePayloads(typeOrPayload, { data });
            return payload;
        },

        sendDataToServer(typeOrPayload, data, callback = () => {}) {
            if (typeof typeOrPayload === "string") {
                typeOrPayload = {type: typeOrPayload};
            }

            let payload = this.mergePayloads(typeOrPayload, {
                browserTime: Date.now(),
                mfSessionId: mfSession.id,
                transaction_id: mfSession.transaction_id,
                data: data
            });

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/SDSS/", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        console.log("Response from server:", response);
                        callback();
                    } else {
                        console.error("Error:", xhr.status, xhr.statusText);
                        callback();
                    }
                }
            };
            xhr.send(JSON.stringify(payload));
        },

        sendDataToServerWithFetch: async function (typeOrPayload, data, callback = () => {}){
            if (typeof typeOrPayload === "string") {
                typeOrPayload = {type: typeOrPayload};
            }

            let payload = this.mergePayloads(typeOrPayload, {
                browserTime: Date.now(),
                mfSessionId: mfSession.id,
                transaction_id: mfSession.transaction_id,
                data: data
            });

            const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

            const result = await Promise.race([
                fetch('/SDSS/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }),
                timeout(2000) // 1 second timeout
            ]);

            return result;
        },

        sendFormData: async function(formId, additionalPayload = {}) {
            const form = document.getElementById(formId);

            if (!form) {
                console.error("Form not found with ID:", formId);
                return;
            }

            const excludeFields = ["first_name", "last_name", "email", "phone", "tempDobYear", "dob_month", "dob_date", "postal_code", "address", "ip_address"];
            const hashFields = ["first_name", "last_name", "email", "phone", "postal_code", "address", "ip_address"];
            const formData = {};

            for (const element of form.elements) {
                if (element.name) {
                    formData[element.name] = element.value;
                }
            }

            if (formData['dob_year'] && formData['dob_month'] && formData['dob_date']) {
                const age = this.calculateAge(formData['dob_year'], formData['dob_month'], formData['dob_date']);
                if (age !== null) {
                    formData['age'] = age;
                }
            }

            for (const field of hashFields) {
                if (formData.hasOwnProperty(field)) {
                    const hashedData = await this.sha256(formData[field]);
                    formData[`sha256_${field}`] = hashedData;
                }
            }

            for (const field of excludeFields) {
                delete formData[field];
            }

            additionalPayload['form_type'] = MFTools.getElementValueOrDefault('short_form', MFTools.getURLParameter('form_type'));

            return this.sendDataToServerWithFetch(this.mergePayloads({type: "form-submit"}, additionalPayload), formData);
        },

        calculateAge(year, month, day) {
            const dob = new Date(year, month - 1, day);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age >= 0 ? age : null;
        },

        hookClickEventListeners(trackingLinks, listingType, additionalProperties = {}) {
            trackingLinks.forEach(function (link, index) {
                const clickedHref = link.href;
                link.addEventListener('click', function (event) {
                    SDSS.sendDataToServer(listingType, {
                        click_url: link.href,
                        ...additionalProperties,
                    });
                });
            });
        },

        sendTypListingDisplayOrder(trackingLinks, listingType, additionalProperties = {}) {
            const displayPositions = [];
            trackingLinks.forEach(function (link, index) {
                displayPositions.push({
                    click_url: link.href,
                    display_pos: index + 1,
                });
            });

            this.sendDataToServer(listingType, {
                displayPositions: displayPositions,
                ...additionalProperties,
            });
        },

        async getClientBrowserInfo() {
            function parseUserAgent() {
                const ua = navigator.userAgent;
                const [browserName, browserVersion] = ua.split(' ')[0].split('/');
                return { browserName, browserVersion };
            }

            function getDeviceType() {
                if (window.innerWidth < 768) {
                    return 'Mobile';
                } else if (window.innerWidth < 1024) {
                    return 'Tablet';
                } else {
                    return 'Desktop';
                }
            }

            function getScreenOrientation() {
                return window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
            }

            function detectInstalledPlugins() {
                return Array.from(navigator.plugins, (plugin) => plugin.name);
            }

            let urlParams = new URLSearchParams(window.location.search);
            const commonProperties = {
                userAgent: navigator.userAgent,
                ...parseUserAgent(),
                platform: navigator.platform,
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled,
                online: navigator.onLine,
                screen: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    colorDepth: window.screen.colorDepth,
                    orientation: getScreenOrientation(),
                },
                deviceType: getDeviceType(),
                location: {
                    href: window.location.href,
                    hostname: window.location.hostname,
                    protocol: window.location.protocol,
                },
                plugins: detectInstalledPlugins(),
                windowDimensions: {
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                },
                pageLoadTiming: window.performance.timing,
                inputDevice: {
                    touchEnabled: 'ontouchstart' in window,
                    pointerEnabled: 'onpointerdown' in window,
                },
                mediaCapabilities: navigator.mediaCapabilities,
                aff: urlParams.get('affiliate_id'),
                aff_unique3: urlParams.get('aff_unique3'),
                aff_unique5: urlParams.get('aff_unique5')
            };

            return Promise.resolve(commonProperties);
        },

        async sendClientBrowserInfo(additionalPayload = {}) {
            try {
                const browserInfo = await this.getClientBrowserInfo();

                additionalPayload['form_version'] = MFTools.getElementValueOrDefault('form_version', '');
                additionalPayload['aff_sub4'] = MFTools.getElementValueOrDefault('aff_sub4', '');

                const payload = this.mergePayloads({ type: "browser-info" }, additionalPayload);
                this.sendDataToServer(payload, browserInfo);
            } catch (error) {
                console.error('Error fetching browser info:', error);
            }
        },

        sendClientBrowserInfoWhenDOMContentLoaded(additionalPayload = {}) {
            document.addEventListener("DOMContentLoaded", () => {
                this.sendClientBrowserInfo(additionalPayload);
            });
        },
    };

document.addEventListener("DOMContentLoaded", () => {
    MFTools.updateOutlinksWithMfSessionId('mfsid', mfSession.getSessionId());
});
