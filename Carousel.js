'use strict';

var React = require('react-native');
var {
    Dimensions,
    StyleSheet,
    View,
    Text,
    ScrollView,
    } = React;

var TimerMixin = require('react-timer-mixin');

var { width, height } = Dimensions.get('window');

var Carousel = React.createClass({
    mixins: [TimerMixin],

    getDefaultProps() {
        return {
            hideIndicators: false,    // 是否隐藏指示器
            indicatorColor: '#000000', // 指示器颜色
            indicatorSize: 50,      // 指示器尺寸
            inactiveIndicatorColor: '#999999', // 未激活时，指示器颜色
            indicatorAtBottom: true,  // 是否设置指示器位于底部
            indicatorOffset: 250, // 指示器与顶部的偏移量
            width: width, //图片宽度
            initialPage: 0, //默认页码
            indicatorSpace: 25, // 指示器间距
            animate: true, //是否显示动画效果
            delay: 1000, //默认时间间隔
            loop: true, //是否循环
        };
    },

    getInitialState() {
        return {
            activePage: 0,
        };
    },

    componentDidMount() {
        if (this.props.initialPage > 0) {
            var width = this.props.initialPage * this.props.width;
            this.setState({
                activePage: this.props.initialPage
            });
            this.refs.scrollView.scrollTo({x: width, y: 0, animated: this.props.animate});
        }

        if (this.props.animate && this.props.children) {
            this._setUpTimer();
        }
    },

    indicatorPressed(activePage){
        this.setState({activePage});
        this.refs.scrollView.scrollTo({x: activePage * width, y: 0, animated: this.props.animated});
    },

    renderPageIndicator() {
        if (this.props.hideIndicators === true) {
            return null;
        }

        var indicators = [],
            indicatorStyle = this.props.indicatorAtBottom ? {bottom: this.props.indicatorOffset} : {top: this.props.indicatorOffset},
            style, position;

        position = {
            width: this.props.children.length * this.props.indicatorSpace,
        };
        position.left = (this.props.width - position.width) / 2;

        for (var i = 0, l = this.props.children.length; i < l; i++) {
            style = i === this.state.activePage ? {color: this.props.indicatorColor} : {color: this.props.inactiveIndicatorColor};
            indicators.push(<Text style={[style, { fontSize: this.props.indicatorSize }]} key={i}
                                  onPress={this.indicatorPressed.bind(this,i)}>&bull;</Text>);
        }

        return (
            <View style={[styles.pageIndicator, position, indicatorStyle]}>
                {indicators}
            </View>
        );
    },

    _setUpTimer() {
        if (this.props.children.length > 1) {
            this.clearTimeout(this.timer);
            this.timer = this.setTimeout(this._animateNextPage, this.props.delay);
        }
    },

    _animateNextPage() {
        var activePage = 0;
        if (this.state.activePage < this.props.children.length - 1) {
            activePage = this.state.activePage + 1;
        } else if (!this.props.loop) {
            return;
        }

        this.indicatorPressed(activePage);
        this._setUpTimer();
    },

    _onAnimationBegin(e) {
        this.clearTimeout(this.timer);
    },

    _onAnimationEnd(e) {
        //当前页码
        var currentPage = this.state.activePage;
        //图片横向偏移量
        var contentOffset = e.nativeEvent.contentOffset.x;
        //图片横向偏移比例
        var ratio = contentOffset / width;
        //判断图片是左偏移还是右偏移
        var right = contentOffset > currentPage * width && contentOffset <= (currentPage + 1) * width;
        if (right) {
            if ((ratio - parseInt(ratio)) >= 0.15)
                currentPage = parseInt(ratio) + 1;
        } else {
            if ((ratio - parseInt(ratio)) <= 0.85)
                currentPage = parseInt(ratio);
        }
        this.setState({activePage: currentPage});
        this.refs.scrollView.scrollTo({x: (currentPage) * width, y: 0, animated: this.props.animated});
        this._setUpTimer();
    },

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView ref="scrollView"
                            contentContainerStyle={styles.container}
                            automaticallyAdjustContentInsets={false}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            onScrollBeginDrag={this._onAnimationBegin}
                            onScrollEndDrag={this._onAnimationEnd}
                            scrollsToTop={false}
                >
                    {this.props.children}
                </ScrollView>
                {this.renderPageIndicator()}
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    page: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    pageIndicator: {
        position: 'absolute',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
});

module.exports = Carousel;
