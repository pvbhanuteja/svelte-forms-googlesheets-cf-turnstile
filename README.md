# Project Description

This project integrates a SvelteKit application with Google Sheets via the Google Apps Script to create a domain selling platform. Users can submit their offers for a domain through a form, which is then saved to a Google Sheet for easy management and review.

## Key Features

- SvelteKit Frontend: A modern SvelteKit setup for building the user interface.
- Google Sheets API: Utilizes Google Apps Script to append form submissions to a Google Sheet.
- CAPTCHA Integration: Implements Cloudflare Turnstile to prevent spam submissions.
- Responsive Form: A styled and responsive form for submitting domain purchase offers.

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
  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "data": data }))
    .setMimeType(ContentService.MimeType.JSON);
//  Add your real time webhooks here for alerts ex telegram, slack, email, telegram etc as needed.
}
```

- This code will parse the incoming POST request and append the data to the active sheet.

### Step 4: Deploy as Web App

- Click on `Deploy` > `New deployment`.
- Choose `Web app` as the deployment type.
- Set `Who has access` to `Anyone`.
- Click `Deploy` and copy the provided web app URL.

### Step 5: Integrate with Your Project

- Use the web app URL in your project's server-side code to send form data to the Google Sheet.
