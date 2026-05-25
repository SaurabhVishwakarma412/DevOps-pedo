// pipeline {
//     agent any

//     environment {
//         BACKEND_IMAGE = "saurabhkv/project-pedo-backend:latest"
//         FRONTEND_IMAGE = "saurabhkv/project-pedo-frontend:latest"
//     }

//     stages {

//         stage('Docker Hub Login') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-creds',
//                     usernameVariable: 'DOCKER_USER',
//                     passwordVariable: 'DOCKER_PASS'
//                 )]) {
//                     bat '''
//                         docker login -u %DOCKER_USER% -p %DOCKER_PASS%
//                     '''
//                 }
//             }
//         }

//         stage('Build Backend Image') {
//             steps {
//                 bat '''
//                     docker build -t %BACKEND_IMAGE% ./backend
//                 '''
//             }
//         }

//         stage('Build Frontend Image') {
//             steps {
//                 bat '''
//                     docker build -t %FRONTEND_IMAGE% ./frontend
//                 '''
//             }
//         }

//         stage('Push Docker Images') {
//             steps {
//                 bat '''
//                     docker push %BACKEND_IMAGE%
//                     docker push %FRONTEND_IMAGE%
//                 '''
//             }
//         }

//         stage('Deploy Containers') {
//             steps {
//                 bat '''
//                     docker rm -f pedoderma-backend 2>nul
//                     docker rm -f pedoderma-frontend 2>nul

//                     docker pull saurabhkv/project-pedo-backend:latest
//                     docker pull saurabhkv/project-pedo-frontend:latest

//                     docker run -d --name pedoderma-backend -p 5000:5000 saurabhkv/project-pedo-backend:latest

//                     docker run -d --name pedoderma-frontend -p 5173:80 saurabhkv/project-pedo-frontend:latest
//                 '''
//             }
//         }
//     }
// }

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
                    sshagent(['ec2-ssh-key']) {
                        bat '''
                            ssh -o StrictHostKeyChecking=no ubuntu@13.207.69.222 ^
                            "docker pull saurabhkv/project-pedo-backend:latest && ^
                            docker pull saurabhkv/project-pedo-frontend:latest && ^
                            docker compose -f /home/ubuntu/Project-pedo/docker-compose.yml down && ^
                            docker compose -f /home/ubuntu/Project-pedo/docker-compose.yml up -d"
                        '''
                    }
                }
        }
    }
}