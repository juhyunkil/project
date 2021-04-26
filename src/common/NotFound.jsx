import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        const {url} = this.props.match || {};
        return (
            <div>
                <h2>
                    {url} 페이지를 찾을 수 없습니다.
                </h2>
                <Link to="/">
                    메인페이지로 이동
                </Link>
            </div>
        );
    }
}

export default NotFound;