# finance-calc
A finance calculator website, written in Angular. 
Can be viewed at www.fincalc.xyz 

A website that lets the user input various parameters about a hypothetical investment portfolio, and then runs a Monte Carlo simulation to forecast the growth. 
Has a basic mode where the user just chooses the balance between stock market and bond market investments, essentially choosing a risk balance, and for how long to simulate. 
Then there's also an advanced mode that lets the user play with a lot more parameters, like the expected return and variance of the two types of investment vehicles, the details of the simulation and if there is additional savings or withdrawals being made each year. 


# Implementation
The site is written using the Angular framework; the simulations also run in pure javascript/typescript, and there is no backend component. 
This whole thing was really just a small project for me to learn the basics of javascript and Angular, so it's not really something so very serious. The chart displaying simulation results is drawn using the nice charting library amCharts 4 (https://www.amcharts.com/). 
