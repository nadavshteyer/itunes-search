import React, {Component} from 'react'
import './Drawer.css'
class Drawer extends Component {
    render() {
        let left;
        this.props.open ? left = 0 : left = '-' + this.props.width
        return (
            <div>
                {this.props.open && 
                <div>
                    <div style={{position: "fixed", width: "100%", height: "100%", zIndex : 500, opacity: 0.5, backgroundColor:"#727272"}}
                    onClick={this.props.onCloseDrawer} >
                    </div>
                    <div className={'try'} >
                        <div className={'drawer'} style={{left: left}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

Drawer.defultProps = {
    width: "400px",
    open: true
}

export default Drawer;