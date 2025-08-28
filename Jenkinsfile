pipeline {
    agent any

    triggers {
        cron('0 5 * * 1') // Every Monday at 5 AM
    }

    environment {
        NODE_VERSION = "20"
        TEST_DIR = "./tests"
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT = "allure-report"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo "Installing npm packages and Playwright browsers..."
                bat """
                    npm install
                    npx playwright install --with-deps
                    npm install -D allure-playwright
                """
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests with Allure reporter..."
                bat "npx playwright test ${TEST_DIR} --reporter=list,allure-playwright"
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure report..."
                bat "npx allure generate ${ALLURE_RESULTS} --clean -o ${ALLURE_REPORT}"
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo "Publishing Allure report in Jenkins"
                publishHTML(target: [
                    reportDir: "${ALLURE_REPORT}",
                    reportFiles: 'index.html',
                    reportName: 'Allure Report',
                    keepAll: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        success {
            echo "Playwright tests passed! Allure report generated."
        }
        failure {
            echo " Playwright tests failed! Check Allure report."
        }
    }
}
