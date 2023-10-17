sudo docker stop frontend
sudo docker rm frontend
sudo docker image rm woozcofe
sudo docker build -t woozcofe .
sudo docker run -d -p 80:3000 --name frontend --network woozco-net woozcofe
