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
        bat '''
"C:\\Windows\\System32\\OpenSSH\\ssh.exe" -o IdentitiesOnly=yes -i C:\\JenkinsKeys\\pedoderma-key.pem -o StrictHostKeyChecking=no ubuntu@13.207.69.222 "docker pull saurabhkv/project-pedo-backend:latest && docker pull saurabhkv/project-pedo-frontend:latest && docker rm -f pedoderma_backend pedoderma_frontend || true && docker run -d --name pedoderma_backend -p 5000:5000 --env-file /home/ubuntu/backend.env saurabhkv/project-pedo-backend:latest && docker run -d --name pedoderma_frontend -p 5173:80 saurabhkv/project-pedo-frontend:latest"
        '''
    }
}
    }
}


