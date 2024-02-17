# Project Description

This project integrates a SvelteKit application with Google Sheets via the Google Apps Script to create a domain selling platform. Users can submit their offers for a domain through a form, which is then saved to a Google Sheet for easy management and review.

## Key Features

- SvelteKit Frontend: A modern SvelteKit setup for building the user interface.
- Google Sheets API: Utilizes Google Apps Script to append form submissions to a Google Sheet.
- CAPTCHA Integration: Implements Cloudflare Turnstile to prevent spam submissions.
- Responsive Form: A styled and responsive form for submitting domain purchase offers.
- Real time notifications using telegram bot API. (Optional)

## Setup and Deployment

1. Clone the repository and install dependencies using npm install.
2. Follow the steps in the README.md to set up the Google Sheets API and Apps Script.
3. Configure environment variables for public and private keys.
4. Run the development server with npm run dev or build the project with npm run build.
5. Deploy the application to a compatible hosting service.

## Technologies Used

- SvelteKit: For building the frontend application.
- Google Apps Script: To connect the form with Google Sheets.
- Cloudflare Turnstile: For CAPTCHA verification.
- Telegram bot API. (Optional)

## Google Sheets API Setup for Project

### Step 1: Create a New Google Sheet

- Navigate to [Google Sheets](https://sheets.google.com).
- Click on the `+ Blank` button or `+ New` button to create a new sheet.
- Name your new sheet appropriately for your project.

### Step 2: Access Google Apps Script

- Open the newly created Google Sheet.
- Click on `Extensions` in the menu bar.
- Select `Apps Script` from the dropdown menu.

### Step 3: Write the Apps Script Code

- In the Apps Script editor, replace any existing code with the following doPost function:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.name, data.email, data.offer, data.message]);
  //  Add your real time webhooks here for alerts ex telegram, slack, email, telegram etc as needed.
  // Send notification to Telegram
  //sendTelegramNotification(`New domain offer received for llm.ing entry received: Name - ${data.name}, Email - ${data.email}, Offer - ${data.offer}, Message - ${data.message}`);
  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "data": data }))
    .setMimeType(ContentService.MimeType.JSON);
}

// function sendTelegramNotification(message) {
//   var token = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your Telegram bot token
//   var chatId = 'YOUR_CHAT_ID'; // Replace with your personal chat ID with the bot
//   var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

//   try {
//     UrlFetchApp.fetch(url);
//   } catch (e) {
//     Logger.log("Failed to send Telegram notification: " + e.message);
//   }
// }
```

- This code will parse the incoming POST request and append the data to the active sheet.

### Step 4: Deploy as Web App

- Click on `Deploy` > `New deployment`.
- Choose `Web app` as the deployment type.
- Set `Who has access` to `Anyone`.
- Click `Deploy` and copy the provided web app URL.

## Deploy to Cloudflare Pages (Optional, but recommended or any other hosting service like Vercel, Netlify, etc.)

Follow these steps to deploy this project to Cloudflare Pages:

1. **Fork or clone this repository:** Start by forking this repository to your GitHub account or cloning it to your local machine.

2. **Sign up or log in to Cloudflare:** If you haven't already, [sign up](https://dash.cloudflare.com/sign-up) for a Cloudflare account or log in.

3. **Create a new project on Cloudflare Pages:** Go to the [Cloudflare Pages dashboard](https://pages.cloudflare.com/) and click on the 'Click on pages tab'(Workers, Pages will be side-by-side).

4. **Connect your GitHub account:** Follow the prompts to connect your GitHub account to Cloudflare Pages if you haven't done so already. This allows Cloudflare Pages to access your repositories.

5. **Select the repository:** Choose the repository you forked or cloned for this project.

6. **Configure your project:** Set up the build settings for your SvelteKit project. For most SvelteKit projects, the build command is `npm run build` and the build output directory is `build`. Make sure to set environment variables as required by your project.

7. **Deploy:** Click on the 'Save and Deploy' button. Cloudflare Pages will then build and deploy your site.

8. **Set up additional features:** Optionally, configure additional features such as custom domains, environment variables, or access restrictions as needed through the Cloudflare dashboard.

Your application is now deployed to Cloudflare Pages! You can access it using the provided URL and connect it to a domain you want to sell.
