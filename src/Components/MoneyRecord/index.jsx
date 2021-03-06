import React, { Component } from 'react';
import './index.scss';

export default class MoneyRecord extends Component {
    state = {
        Avb_Balance: 0,
        Real_Balance: 0,
        tick: null,
        token: null,
    };

    getBalance = async token => {
        if (!token) {
            return;
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('login_session', token);

        const balanceApi = '/j/ChkBalance.aspx';

        try {
            const res = await fetch(balanceApi, {
                headers: headers,
            });

            const resData = await res.json();
            const { Avb_Balance, Real_Balance } = resData.data;

            if (!res.ok) {
                if (resData.code === '91') {
                    console.log('hi');
                }
            }

            this.setState({
                Avb_Balance,
                Real_Balance,
            });
        } catch (error) {
            console.log(error);
        }
    };

    getTick = async token => {
        if (!token) {
            return;
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('login_session', token);

        const getTickApi = '/j/ChkUpdate.aspx';

        try {
            const res = await fetch(getTickApi, {
                headers,
            });
            const resData = await res.json();

            if (!res.ok) {
                if (resData.code === '91') {
                    console.log('hi');
                }
            }

            const { UpdateTick: tick } = resData.data;
            this.setState({
                tick,
            });
        } catch (error) {
            console.log(error);
        }
    };

    checkTick = async token => {
        if (!token) {
            return;
        }

        const { tick } = this.state;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('login_session', token);

        const getTickApi = '/j/ChkUpdate.aspx';

        try {
            const res = await fetch(getTickApi, {
                headers,
            });

            const resData = await res.json();
            const { UpdateTick: checkTick } = resData.data;

            if (!res.ok) {
                if (resData.code === '91') {
                    console.log('hi');
                }
            }

            if (tick !== checkTick) {
                this.getBalance();
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({
                token,
            });

            this.getTick(token);
            this.getBalance(token);

            const timer = 1000 * 60; // 一分鐘

            setInterval(() => {
                this.checkTick(token);
            }, timer);
        }
    }

    render() {
        const { Avb_Balance, Real_Balance, token } = this.state;
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="balance">
                                結餘：
                                <span className="usdt"></span>
                                <span className="c_green">USDT</span>
                                <span className="c_green fs_20">{Real_Balance}</span>
                            </div>

                            <div className="balance pl_6">
                                可提：
                                <span className="usdt"></span>
                                <span className="c_green">USDT</span>
                                <span className="c_green fs_20">{Avb_Balance}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* for test */}
                <h3>測試用</h3>
                <button onClick={() => this.getBalance(token)}>test balance api</button>
                <button onClick={() => this.getTick(token)}>Tick api</button>
            </section>
        );
    }
}
