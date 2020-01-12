class MyMeal extends React.Component{
    onChangeSelect=(e)=>{
        console.log(e);
    }
    render(){
        return(
            <div class="my-meals-wrapper" style={{display: this.props.display}}>
                <div class="my-meals-content">
                    <button class="btn-close" onClick={this.props.onClose}>X</button>
                    <div>
                        <select onChange={(e)=>{this.onChangeSelect(e.target.options[e.target.selectedIndex].value)}}>
                            <option value="0">בחר</option>
                            <option value="2">סך היום</option>
                            <option value="3">סך כל השבוע</option>
                            <option value="4">כל הארוחות ב שבוע האחרון</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}