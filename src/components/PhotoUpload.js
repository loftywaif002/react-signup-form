'use strict';

var React = require('react/addons');
var Icon = require('components/Icon');

require('styles/PhotoUpload.sass');

var PhotoUpload = React.createClass({
  getInitialState: function() {
    return {
      inputLoaded: false,
      dataUri: ''
      };
  },
  onInputChange: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
        this.setState({
            dataUri: upload.target.result,
            inputLoaded: true
        });
    }.bind(this);

    if(file instanceof Blob){
      reader.readAsDataURL(file);
    }
  },
  render: function () {
    var containerClass = this.state.inputLoaded ? this.props.className + ' content-loaded' : this.props.className;
    var preview = this.state.inputLoaded ? <div className="img-preview"><img src={this.state.dataUri} id="preview"/></div> : '';
    var button = this.state.inputLoaded ? '' : <button className="upload-button">
    <Icon type="circle-error"/>
    <label>Upload you favourite picture</label>
    </button>;
    return (<div className={containerClass}>
        {button}
        <input type="file" name="file1" onChange={this.onInputChange}/>
        {preview}
        </div>);
  }
});

module.exports = PhotoUpload;
