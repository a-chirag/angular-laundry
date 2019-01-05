#sudo ng build --prod
ssh -t -i "../../Downloads/2019-ec2.pem" ec2-user@ec2-52-66-248-99.ap-south-1.compute.amazonaws.com "rm -r ui/*"
scp -i "../../Downloads/2019-ec2.pem" -r dist/* ec2-user@ec2-52-66-248-99.ap-south-1.compute.amazonaws.com:~/ui
