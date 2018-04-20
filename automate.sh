sudo ng build --prod
ssh -t -i "../../Downloads/ec2key.pem" ec2-user@ec2-13-126-141-236.ap-south-1.compute.amazonaws.com "rm -r ui/*"
scp -i "../../Downloads/ec2key.pem" -r dist/* ec2-user@ec2-13-126-141-236.ap-south-1.compute.amazonaws.com:~/ui