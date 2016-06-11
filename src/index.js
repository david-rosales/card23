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
        if(!this.state.animating){
            this.setState({animating: true, open:!event.shiftKey});
        }
        if(this.state.open){
            if(!event.shiftKey){
                var interval = setInterval(function(){
                    var n = this.state.animationNum+1;
                    if(n > 5){
                        n = 5;
                        clearInterval(interval);
                        this.setState({animating:false})
                    }else{
                        this.setState({animationNum: this.state.animationNum+1});
                    }
                }.bind(this).bind(interval), 80);
            }
        }else{
            if(event.shiftKey){
                var interval = setInterval(function(){
                    var n = this.state.animationNum-1;
                    if(n < 0){
                        n = 0;
                        clearInterval(interval);
                        this.setState({animating:false})
                    }else{
                        this.setState({animationNum: this.state.animationNum-1});
                    }
                }.bind(this).bind(interval), 80);   
            }
        }
    },
    
   render: function(){
       return <div>
            <button onClick={this.buttonP} style={{border: "none"}}><img src={"/images/" + this.state.pageNum + "-" + this.state.animationNum + ".png"}></img></button>
            <h3>Double Click to Progress</h3>
            <h3>Hold Shift and Double Click to Go Back</h3>
       </div>
   } 
});



ReactDOM.render(<BookComponent />, document.getElementById("container"));