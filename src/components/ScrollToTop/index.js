import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// react-router切换页面后跳转到页面顶部
class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			document.getElementById("content").scrollTo(0, 0);
		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default withRouter(ScrollToTop)
