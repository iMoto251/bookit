FROM ubuntu

WORKDIR /root

RUN apt-get update
RUN apt-get install -y git python2.7 python-setuptools
RUN git clone https://github.com/maciejkula/spotlight.git
RUN apt-get install -y curl
RUN curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py
RUN python2.7 get-pip.py
RUN pip2 install numpy
RUN pip2 install h5py
RUN pip2 install pandas
RUN pip2 install torch==1.1.0 torchvision==0.3.0
RUN python2.7 ./spotlight/setup.py build
RUN python2.7 ./spotlight/setup.py install
RUN apt-get https://www.dropbox.com/s/w1pas179ctxfx8r/books.csv?dl=0
RUN apt-get https://www.dropbox.com/s/nvm15oaxk2opk0q/ratings.csv?dl=0 
