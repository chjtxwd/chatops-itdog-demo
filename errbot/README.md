# step to init errbot 
``virtualenv --python `which python3` ~/.errbot-ve``

`~/.errbot-ve/bin/pip install errbot`

`source ~/.errbot-ve/bin/activate` 

`mkdir ~/errbot-root`

`cd ~/errbot-root`

`errbot --init`

# install dependency

`pip3 install pandas`

`pip3 install tabulate`

`pip install errbot[telegram]`

#  test mode 
`errbot -T `

# init plugin
`errbot --new-plugin itdog`

