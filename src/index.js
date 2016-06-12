var React = require("react");
var ReactDOM = require("react-dom");

var BookComponent = React.createClass({
    getInitialState: function(){
        return ({
            pageNum: 0,
            animationNum: 0,
            animating: false,
            open: true
        });
    },
    
    keyPressed: function(event){
        console.log(event.key);
    },
    
    buttonP: function(event){
        if(!event.shiftKey){
            var n = this.state.animationNum+1;
            var pn = this.state.pageNum; 
            if(n >= 5){
                n = 0;
                pn += 1;
            }
            var interval = setInterval(function(){
                n+=1;
                if(n > 5){
                    n = 5;
                    clearInterval(interval);
                }else{
                    this.setState({animationNum: n, pageNum: pn});
                }
            }.bind(this, interval, n, pn), 80);
        }else{
            var n = this.state.animationNum-1;
            var pn = this.state.pageNum; 
            if(n <= 0){
                n = 5;
                pn -= 1;
            }
            var interval = setInterval(function(){
                n-=1;
                if(n < 0){
                    n = 0;
                    clearInterval(interval);
                }else{
                    this.setState({animationNum: n, pageNum: pn});
                }
            }.bind(this, interval, n, pn), 80);
        }
    },
    
   render: function(){
       return <div>
            <button onClick={this.buttonP} style={{border: "none"}}><img src={"images/" + this.state.pageNum + "/" + this.state.animationNum + ".png"}></img></button>
            <h3>Double Click to Progress</h3>
            <h3>Hold Shift and Double Click to Go Back</h3>
       </div>
   } 
});



ReactDOM.render(<BookComponent />, document.getElementById("container"));