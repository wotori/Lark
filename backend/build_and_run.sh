echo "____Building image..."
sudo docker build --tag lark .
echo "____Stopping old container..."
sudo docker stop lark
echo "____Removing old container..."
sudo docker rm lark
echo "____Starting service as a new container..."
# --network=host
sudo docker run -d --name lark --network=host --restart always --memory=1G --memory-reservation=512M lark
echo "___Update head"
sudo docker exec -t lark alembic upgrade head
