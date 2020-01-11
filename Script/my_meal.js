class MyMeal extends React.Component{
    render(){
        return(
            <div class="my-meals-wrapper" style={{display: this.props.display}}>
                <div class="my-meals-content">
                    <button class="btn-close" onClick={this.props.onClose}>X</button>
                </div>
            </div>
        );
    }
}