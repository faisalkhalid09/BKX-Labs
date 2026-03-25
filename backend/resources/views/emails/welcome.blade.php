<x-mail::message>
# Welcome to the Future of Digital Excellence, {{ explode(' ', $user->name)[0] }}! 🚀

We're thrilled to have you join the **BKX Labs** community. You've just taken the first step towards accessing premium digital assets and elite resources designed to elevate your projects.

---

### Why BKX Labs?

*   **Premium Quality**: Every asset is hand-vetted for the highest standard.
*   **Instant Access**: Download your purchases immediately, anytime, anywhere.
*   **Security First**: Your safety and privacy are our top priorities.

---

<x-mail::button :url="route('store.index')">
Explore the Store
</x-mail::button>

If you have any questions or need assistance, our support team is always just an email away. We can't wait to see what you build with our resources!

Stay inspired,<br>
**The BKX Labs Team**

<x-mail::subcopy>
You received this email because you signed up for a BKX Labs account. If you did not create this account, please ignore this message.
</x-mail::subcopy>
</x-mail::message>
