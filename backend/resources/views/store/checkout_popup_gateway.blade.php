<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Secure Payment</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #0f172a;
            color: #e2e8f0;
            font-family: Arial, sans-serif;
        }
        .card {
            width: min(92vw, 420px);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 14px;
            padding: 18px;
            background: rgba(15, 23, 42, 0.75);
            text-align: center;
        }
        .muted { color: #94a3b8; font-size: 0.9rem; }
        .status {
            margin-top: 10px;
            color: #fca5a5;
            font-size: 0.88rem;
            min-height: 1.2em;
        }
        .btn {
            margin-top: 10px;
            padding: 8px 12px;
            border: 1px solid #334155;
            color: #e2e8f0;
            background: transparent;
            border-radius: 8px;
            cursor: pointer;
            display: none;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2 style="margin:0 0 8px 0; font-size:1.1rem;">Opening Secure Checkout</h2>
        <p class="muted">Please wait while we initialize payment.</p>
        <p id="popup-status" class="status"></p>
        <div id="safepay-button-container" style="margin-top:14px;"></div>
        <button id="close-popup-btn" class="btn" type="button" onclick="window.close()">Close Window</button>
    </div>

    <script src="{{ route('checkout.sfpy.script') }}"></script>

    <script>
        (function () {
            const redirectUrl = @json($redirectUrl ?? '');
            const envMode = @json($mode ?? 'sandbox');
            const apiKey = @json($apiKey ?? '');
            const amount = @json($amount ?? 0);
            const currency = @json($currency ?? 'USD');
            const orderRef = @json($orderRef ?? '');
            const successUrl = "{{ route('checkout.success', ['success' => 'true', 'order_ref' => $orderRef, 'state' => $stateToken]) }}";
            const cancelUrl = "{{ route('checkout.popup.cancel', ['order_ref' => $orderRef, 'state' => $stateToken]) }}";
            const statusEl = document.getElementById('popup-status');
            const closeBtn = document.getElementById('close-popup-btn');
            const buttonContainer = document.getElementById('safepay-button-container');
            const debugMode = true;

            function setStatus(message) {
                if (statusEl) statusEl.textContent = message;
                if (closeBtn) closeBtn.style.display = 'inline-block';
            }

            function notifyParent(payload) {
                if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(payload, window.location.origin);
                }
            }

            function fallbackRedirect(reason) {
                console.warn('SafePay button flow fallback:', reason);

                if (debugMode) {
                    notifyParent({ type: 'safepay:cancelled', reason: reason });
                    setStatus('Component flow failed: ' + reason + '. Check popup console/network.');
                    return;
                }

                if (!redirectUrl) {
                    notifyParent({ type: 'safepay:cancelled' });
                    setStatus('Unable to start checkout. Missing redirect URL.');
                    window.location.href = cancelUrl;
                    return;
                }

                try {
                    window.location.replace(redirectUrl);
                } catch (error) {
                    window.location.href = redirectUrl;
                }
            }

            try {
                const missing = [];
                if (typeof safepay === 'undefined') missing.push('safepay_global');
                if (!buttonContainer) missing.push('button_container');
                if (!apiKey) missing.push('api_key');
                if (!amount || Number(amount) <= 0) missing.push('amount');
                if (!currency) missing.push('currency');

                if (missing.length > 0) {
                    fallbackRedirect('component_preconditions_missing:' + missing.join(','));
                    return;
                }

                setStatus('Preparing secure checkout...');

                const button = safepay.Button({
                    env: envMode,
                    client: {
                        sandbox: apiKey,
                        production: apiKey
                    },
                    style: {
                        mode: 'light',
                        size: 'medium',
                        variant: 'primary'
                    },
                    orderId: orderRef,
                    source: 'website',
                    payment: {
                        currency: String(currency).toUpperCase(),
                        amount: Number(amount)
                    },
                    onPayment: function (data) {
                        const tracker = data && data.payment && data.payment.tracker ? String(data.payment.tracker) : '';
                        const redirect = tracker ? (successUrl + '&tracker=' + encodeURIComponent(tracker)) : successUrl;
                        notifyParent({ type: 'safepay:success', redirect: redirect });
                        window.location.href = redirect;
                    },
                    onCancel: function () {
                        notifyParent({ type: 'safepay:cancelled' });
                        window.location.href = cancelUrl;
                    }
                });

                button.render('#safepay-button-container');

                // Auto-click rendered button to preserve one-click popup experience.
                setTimeout(function () {
                    const autoBtn = buttonContainer.querySelector('button, [role="button"], iframe');
                    if (autoBtn && typeof autoBtn.click === 'function') {
                        autoBtn.click();
                    }
                }, 350);
            } catch (err) {
                console.error('SafePay component init error:', err);
                fallbackRedirect('component_init_error');
            }
        })();
    </script>
</body>
</html>
