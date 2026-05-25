pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "saurabhkv/project-pedo-backend:latest"
        FRONTEND_IMAGE = "saurabhkv/project-pedo-frontend:latest"
    }

    stages {

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                bat '''
                    docker build -t %BACKEND_IMAGE% ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat '''
                    docker build -t %FRONTEND_IMAGE% ./frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                bat '''
                    docker push %BACKEND_IMAGE%
                    docker push %FRONTEND_IMAGE%
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    bat '''
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" %SSH_USER%@13.207.69.222 ^
                        "docker pull %BACKEND_IMAGE% && ^
                        docker pull %FRONTEND_IMAGE% && ^
                        docker rm -f pedoderma_backend pedoderma_frontend 2>/dev/null || true && ^
                        docker run -d --name pedoderma_backend -p 5000:5000 --env-file /home/ubuntu/backend.env %BACKEND_IMAGE% && ^
                        docker run -d --name pedoderma_frontend -p 5173:80 %FRONTEND_IMAGE%"
                    '''
                }
            }
        }
    }
}