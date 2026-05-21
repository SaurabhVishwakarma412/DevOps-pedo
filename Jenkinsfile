pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "saurabhkv/project-pedo-backend:latest"
        FRONTEND_IMAGE = "saurabhkv/project-pedo-frontend:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SaurabhVishwakarma412/DevOps-pedo.git'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                bat 'docker push %BACKEND_IMAGE%'
                bat 'docker push %FRONTEND_IMAGE%'
            }
        }

        stage('Deploy Containers') {
            steps {
                bat '''
                    docker stop pedoderma-backend
                    docker rm pedoderma-backend

                    docker stop pedoderma-frontend
                    docker rm pedoderma-frontend
                '''

                bat 'docker pull %BACKEND_IMAGE%'
                bat 'docker pull %FRONTEND_IMAGE%'

                bat 'docker run -d --name pedoderma-backend -p 5000:5000 %BACKEND_IMAGE%'

                bat 'docker run -d --name pedoderma-frontend -p 5173:80 %FRONTEND_IMAGE%'
            }
        }
    }
}