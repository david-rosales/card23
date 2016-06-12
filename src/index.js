var React = require("react");
var ReactDOM = require("react-dom");

var BookComponent = React.createClass({
    getInitialState: function(){
        return ({
            pageNum: 0,
            animationNum: 0,
            animating: false,
            canGoRight: true,
            canGoLeft: false,
            open: true
        });
    },
    
    keyPressed: function(event){
        console.log(event.key);
    },
    
    buttonRight: function(event){
        var n = this.state.animationNum+1;
        var pn = this.state.pageNum;
        if(!this.state.animating && this.state.canGoRight){
            if(n >= 5){
                n = 0;
                pn += 1;
            }
            var interval = setInterval(function(){
                n+=1;
                var right = true;
                if(pn >= 14){
                    right = false;
                }
                if(n > 5){
                    n = 5;
                    clearInterval(interval);
                    this.setState({animating: false, canGoRight: right, canGoLeft: true});
                }else{
                    this.setState({animationNum: n, pageNum: pn, animating: true});
                }
            }.bind(this, interval, n, pn), 80);
        }
    },
    
    buttonLeft: function(event){
        var n = this.state.animationNum-1;
        var pn = this.state.pageNum; 
        if(!this.state.animating && this.state.canGoLeft){
            if(n <= 0){
                n = 5;
                pn -= 1;
            }
            var interval = setInterval(function(){
                n-=1;
                var left = true;
                if(pn <= 0){
                    left = false;
                }
                if(n < 0){
                    n = 0;
                    clearInterval(interval);
                    this.setState({animating:false, canGoLeft: left, canGoRight: true});
                }else{
                    this.setState({animationNum: n, pageNum: pn, animating: true});
                }
            }.bind(this, interval, n, pn), 80);
        }
    },
    
   render: function(){
       return (
       <div>
           <div className="row">
               <h4 className="center-align">Happy 23rd Anniversary!</h4>
           </div>   
           <div className="row">
                <div className="col s3 left">
                    <button className={"btn btn-large waves-effect waves-light red valign right" + (this.state.animating ? " disabled" : !this.state.canGoLeft ? " disabled" : "")} onClick={this.buttonLeft}><h5>Go Back</h5></button>
                </div>
                <div className="col s6">
                    <div className="card-panel center-align"><img className="responsive-img" src={"images/" + this.state.pageNum + "/" + this.state.animationNum + ".png"}></img></div>
                </div>
                <div className="col s3 right">
                    <button className={"btn btn-large waves-effect waves-light red valign left" + (this.state.animating ? " disabled" : !this.state.canGoRight ? " disabled" : "")} onClick={this.buttonRight}><h5>Go Forward</h5></button>
                </div>
           </div>
       </div>
           );
   } 
});



ReactDOM.render(<BookComponent />, document.getElementById("container"));