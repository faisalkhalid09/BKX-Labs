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
        .spinner {
            width: 42px;
            height: 42px;
            border: 4px solid rgba(148, 163, 184, 0.3);
            border-top-color: #38bdf8;
            border-radius: 50%;
            margin: 0 auto 12px;
            animation: spin 0.9s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
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
        <div class="spinner" aria-hidden="true"></div>
        <h2 style="margin:0 0 8px 0; font-size:1.1rem;">Opening Secure Checkout</h2>
        <p class="muted">Please wait while we initialize payment.</p>
        <p id="popup-status" class="status"></p>
        <button id="close-popup-btn" class="btn" type="button" onclick="window.close()">Close Window</button>
    </div>

    <script src="{{ $sdkScriptUrl }}"></script>
    <script>
        (function () {
            const successUrl = "{{ route('checkout.success', ['success' => 'true', 'order_ref' => $orderRef, 'state' => $stateToken]) }}";
            const cancelUrl = "{{ route('checkout.popup.cancel', ['order_ref' => $orderRef, 'state' => $stateToken]) }}";
            const statusEl = document.getElementById('popup-status');
            const closeBtn = document.getElementById('close-popup-btn');
            const openedAt = Date.now();

            function setStatus(message) {
                if (statusEl) statusEl.textContent = message;
                if (closeBtn) closeBtn.style.display = 'inline-block';
            }

            function notifyParent(payload) {
                if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(payload, window.location.origin);
                }
            }

            if (typeof safepay === 'undefined') {
                notifyParent({ type: 'safepay:cancelled' });
                setStatus('SafePay SDK failed to load. Please close this window and try again.');
                return;
            }

            try {
                safepay.setup({
                    environment: "{{ $mode }}",
                    apiKey: "{{ $apiKey }}",
                    v3: true
                });

                safepay.checkout({
                    amount: {{ json_encode($amount) }},
                    currency: "{{ $currency }}",
                    metadata: {
                        order_id: "{{ $orderRef }}"
                    },
                    onSucceeded: function(data) {
                        const tracker = data && data.tracker ? encodeURIComponent(data.tracker) : '';
                        const redirect = tracker ? (successUrl + '&tracker=' + tracker) : successUrl;
                        notifyParent({ type: 'safepay:success', redirect: redirect });
                        window.close();
                        window.location.href = redirect;
                    },
                    onCancelled: function() {
                        notifyParent({ type: 'safepay:cancelled' });

                        if (Date.now() - openedAt < 2500) {
                            setStatus('SafePay cancelled immediately during initialization. Please retry or verify SafePay dashboard settings.');
                            return;
                        }

                        window.close();
                    }
                });
            } catch (error) {
                notifyParent({ type: 'safepay:cancelled' });
                setStatus('Failed to initialize secure checkout. ' + (error && error.message ? error.message : ''));
                window.location.href = cancelUrl;
            }
        })();
    </script>
</body>
</html>
