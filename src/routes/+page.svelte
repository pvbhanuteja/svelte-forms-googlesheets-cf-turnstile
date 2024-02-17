<script>
    import { Turnstile } from 'svelte-turnstile';
    export let form;
    import { PUBLIC_CF_TURNSTILE_SITE_KEY, PUBLIC_DOMAIN_NAME } from '$env/static/public';
</script>

<style>
    form {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f9f9f9;
    }
    h1 {
        text-align: center;
        color: #333;
    }
    p {
        text-align: center;
        color: #666;
    }
    label {
        display: block;
        margin-top: 20px;
        color: #333;
    }
    input, textarea {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        background-color: #0056b3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #003d82;
    }
</style>

{#if form?.error}
    <p class="error-message">{form?.error}</p>
{/if}

{#if form?.success}
    <script>
        window.alert('Thanks for submission we will reachout shortly');
    </script>
{/if}

<!--  -->
<h1>Welcome to the Domain {PUBLIC_DOMAIN_NAME}</h1>
<p>If you are interested in purchasing the domain, please fill out the form below.</p>

<form method="POST">
    <label for="name">
        Name
        <input id="name" name="name" type="text" required>
    </label>
    <label for="email">
        Email
        <input id="email" name="email" type="email" required>
    </label>
    <label for="offer">
        Offer in USD
        <input id="offer" name="offer" type="number" required>
    </label>
    <label for="message">
        Message
        <textarea id="message" name="message"></textarea>
    </label>
    <Turnstile siteKey={PUBLIC_CF_TURNSTILE_SITE_KEY} />
    <button type="submit">Make an Offer</button>
</form>