# casumo_tests
Steps to Set Up and Run Tests

1. Install Node.js
Download and install Node.js from nodejs.org.

2. Install Visual Studio Code
Download and install Visual Studio Code from code.visualstudio.com.

3. Set Up Playwright
Open Visual Studio Code.
Open the terminal in Visual Studio Code (View > Terminal).
Run the following command to initialize Playwright with TypeScript:

    ```console
    npm init playwright@latest
    ```
    Select TypeScript when prompted.

4. Additional - Install Docker
Download and install Docker from docker.com.

5. Run Devowelizer Service
Make sure Docker is running.
In the terminal, run:

    ```console
    docker run -p 8080:8080 -it casumo/devowelizer:latest
    ```
6. Run Tests
In the terminal, run:
     ```console
    npm run test
    ```
7. View Test Report
To see the test report, run:
    ```console
    npm run show-report
    ```
Additional 
For easier test run - install Playwright Test for VSCode extension from Microsoft