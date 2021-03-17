(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{183:function(e,a,t){},199:function(e,a,t){"use strict";t.r(a);var r=t(143),s=t(0),n=t.n(s),l=t(24),m=t(136),c=(t(183),t(64)),o=(t(63),t(22)),i=t(7),d=t(191),u=d.b().shape({businessName:d.d().required("Business Name Is Required"),email:d.d().email("Invalid email").required("Email Is Required"),phone:d.a().required("Phone Number Is Required"),password:d.d().min(6).required("Password Is Required"),confirmPassword:d.d().oneOf([d.c("password"),null],"Passwords don't match").required("Password Is Required")});a.default=Object(l.b)((function(e){var a=e.register,t=e.app;return{isCreatingUser:a.isCreatingUser,metaData:t.metaData}}),(function(e){return{createUser:Object(i.bindActionCreators)(c.a,e),signupWithGoogle:Object(i.bindActionCreators)(c.c,e)}}))((function(e){var a=e.isCreatingUser,t=e.metaData,l=e.createUser,c=e.history,i=e.signupWithGoogle,d=Object(s.useState)(0),p=Object(r.a)(d,2),b=p[0],E=p[1],N=1===b;return n.a.createElement("div",{className:"auth-fluid"},n.a.createElement("div",{className:"auth-fluid auth-fluid-right text-center"},n.a.createElement("div",{className:"auth-user-testimonial"},n.a.createElement("h2",{className:"mb-3"},"I love the color!"),n.a.createElement("p",{className:"lead"},n.a.createElement("i",{className:"mdi mdi-format-quote-open"})," It's a elegent templete. I love it very much! ."," ",n.a.createElement("i",{className:"mdi mdi-format-quote-close"})),n.a.createElement("p",null,"- Hyper Admin User"))),n.a.createElement("div",{className:"auth-fluid-form-box",style:{maxWidth:"70%"}},n.a.createElement("div",{className:"align-items-center d-flex h-100"},n.a.createElement("div",{className:"card-body card-body-form"},n.a.createElement(m.c,{initialValues:{email:"",confirmPassword:"",password:"",businessName:"",phone:"",countryId:1},onSubmit:function(e){l(e,c)},validationSchema:u},(function(e){var r=e.errors,s=e.touched,l=e.setFieldValue;e.validateForm;return n.a.createElement(m.b,{action:"#"},n.a.createElement("h4",{className:"mt-0"},"Free Sign Up"),n.a.createElement("p",{className:"text-muted mb-4"},"Don't have an account? Create your account, it takes less than a minute"),n.a.createElement("a",{onClick:function(){i(c)},className:"btn btn-block btn-primary mb-3"},"Login With Google"),n.a.createElement("ul",{className:"nav nav-pills nav-justified form-wizard-header mb-3"},n.a.createElement("li",{className:"nav-item",onClick:function(){return E(0)}},n.a.createElement("a",{"data-toggle":"tab",className:"".concat(0==b?"nav-link rounded-0 pt-2 pb-2 active":"nav-link rounded-0 pt-2 pb-2")},n.a.createElement("i",{className:"mdi mdi-account-circle mr-1"}),n.a.createElement("span",{className:"d-none d-sm-inline"},"Business Info."))),n.a.createElement("li",{className:"nav-item",onClick:function(){return E(1)}},n.a.createElement("a",{"data-toggle":"tab",className:"".concat(1==b?"nav-link rounded-0 pt-2 pb-2 active":"nav-link rounded-0 pt-2 pb-2")},n.a.createElement("i",{className:"mdi mdi-face-profile mr-1"}),n.a.createElement("span",{className:"d-none d-sm-inline"},"Password")))),n.a.createElement("div",{id:"bar",className:"progress mb-3",style:{height:"7px"}},n.a.createElement("div",{className:"bar progress-bar progress-bar-striped progress-bar-animated bg-success",style:{width:"".concat(50*(b+1),"%")}})),n.a.createElement("div",{className:0===b?"d-block":"d-none"},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"fullname"},"Business Name"),n.a.createElement(m.a,{className:"form-control",type:"text",name:"businessName",placeholder:"Enter your Business Name"}),r.businessName&&s.businessName?n.a.createElement("div",{className:"invalid-feedback"},r.businessName):null),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"emailaddress"},"Email address"),n.a.createElement(m.a,{className:"form-control",type:"email",name:"email",placeholder:"Enter your email"}),r.email&&s.email?n.a.createElement("div",{className:"invalid-feedback"},r.email):null),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"Telephone"),n.a.createElement("div",{className:"d-flex"},n.a.createElement("select",{name:"countryId",required:!0,onChange:function(e){return l("countryId",e.target.value)},className:"form-control custom-select col-md-3 border-right-radius"},t.length?t[0].countries.map((function(e,a){return n.a.createElement("option",{key:e.id,value:e.id},e.phone_code)})):null),";",n.a.createElement(m.a,{type:"tel",name:"phone",className:"form-control border-left-radius","data-toggle":"input-mask",placeholder:"Enter your Telephone Number","data-mask-format":"0000-0000"})),r.phone&&s.phone?n.a.createElement("div",{className:"invalid-feedback"},r.phone):null)),n.a.createElement("div",{className:1===b?"d-block":"d-none"},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Password"),n.a.createElement(m.a,{className:"form-control",type:"password",name:"password",id:"password",placeholder:"Enter your password"}),r.password&&s.password?n.a.createElement("div",{className:"invalid-feedback"},r.password):null),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Confirm Password"),n.a.createElement(m.a,{className:"form-control",type:"password",name:"confirmPassword",placeholder:"Confim your password"}),r.confirmPassword&&s.confirmPassword?n.a.createElement("div",{className:"invalid-feedback"},r.confirmPassword):null)),n.a.createElement("div",{className:"form-group"},n.a.createElement("div",{className:"custom-control custom-checkbox"},n.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"checkbox-signup"}),n.a.createElement("label",{className:"custom-control-label",htmlFor:"checkbox-signup"},"I accept"," ",n.a.createElement("a",{href:"#",className:"text-muted"},"Terms and Conditions")))),n.a.createElement("div",{className:"form-group mb-0 text-center"},N?n.a.createElement("button",{type:"submit",disabled:a,className:"btn btn-primary pull-right"},a?n.a.createElement("span",{className:"spinner-border spinner-border-sm mr-1",role:"status","aria-hidden":"true"}):null,a?"Submitting":"Submit"):n.a.createElement("a",{href:"#",onClick:function(e){e.preventDefault(),E(b+1)},className:"btn btn-dark pull-right"},"Next")))})),n.a.createElement("footer",{className:"footer footer-alt"},n.a.createElement("p",{className:"text-muted"},"Already have account?"," ",n.a.createElement(o.b,{to:"/",className:"text-muted ml-1"},n.a.createElement("b",null,"Log In"))))))))}))}}]);
//# sourceMappingURL=11.b0baa626.chunk.js.map