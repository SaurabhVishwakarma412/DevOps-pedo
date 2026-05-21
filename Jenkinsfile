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
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build -t $BACKEND_IMAGE ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build -t $FRONTEND_IMAGE ./frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                    docker push $BACKEND_IMAGE
                    docker push $FRONTEND_IMAGE
                '''
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                    docker stop pedoderma-backend || true
                    docker rm pedoderma-backend || true

                    docker stop pedoderma-frontend || true
                    docker rm pedoderma-frontend || true

                    docker pull $BACKEND_IMAGE
                    docker pull $FRONTEND_IMAGE

                    docker run -d \
                      --name pedoderma-backend \
                      -p 5000:5000 \
                      $BACKEND_IMAGE

                    docker run -d \
                      --name pedoderma-frontend \
                      -p 5173:80 \
                      $FRONTEND_IMAGE
                '''
            }
        }
    }
}