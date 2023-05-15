# QR Scanner Application

This application allows you to scan QR codes using your device's camera and stores unique scan results in a list. You can also download these results as a CSV file.

## How to Use

```bash
npm i local-ssl-proxy
npm i
npm start
```

Start the application by running npm start or yarn start in the terminal. This will start the application on a local server, usually on port 3000.

Open the application in a web browser by navigating to http://localhost:3000. You should see the QR scanner interface.

Point your device's camera at a QR code to scan it. Scanned results will appear in a list on the screen.

If you want to download the scanned results as a CSV file, click the "Download CSV" button.

## SSL Passthrough

If you need to access the application over HTTPS (i.e. on a smartphone), you can use a tool like `local-ssl-proxy` to create an SSL passthrough.

Here's how to use local-ssl-proxy with this application:

In a new terminal window, navigate to the root directory of the application.

Run the following command to start local-ssl-proxy:

```bash
local-ssl-proxy -s 3001 -t 3000 -n 0.0.0.0
```

This command tells local-ssl-proxy to start a proxy that listens on port 3001 (HTTPS) and forwards requests to port 3000 (HTTP). The -n 0.0.0.0 option allows connections from any network interface.

Now, you can access the application over HTTPS by navigating to https://localhost:3001 in your web browser or to your computer's IP on a local network like https://192.168.1.69:3001.

Please note that you might see a warning in your browser when you navigate to the HTTPS URL, because local-ssl-proxy uses a self-signed certificate by default. You can safely ignore this warning for local development.

## Further Support

If you encounter any issues while using the application, please refer to the official React and Next.js documentation, or ask for help on StackOverflow or a similar platform.

## Disclaimer

Please note that this application is intended for educational and development purposes only. It is not recommended to use this application for scanning sensitive information or in a production environment without proper security measures in place.