"use strict";(self.webpackChunkatrio=self.webpackChunkatrio||[]).push([[342],{6308:(E,w,a)=>{a.d(w,{JX:()=>k,YE:()=>x,nU:()=>H});var o=a(4650),g=a(2687),S=a(1281),v=a(9521),_=a(3238),M=a(7579),D=a(6451),e=a(7340),p=a(6895);const d=["mat-sort-header",""];function c(r,s){if(1&r){const t=o.EpF();o.TgZ(0,"div",3),o.NdJ("@arrowPosition.start",function(){o.CHM(t);const n=o.oxw();return o.KtG(n._disableViewStateAnimation=!0)})("@arrowPosition.done",function(){o.CHM(t);const n=o.oxw();return o.KtG(n._disableViewStateAnimation=!1)}),o._UZ(1,"div",4),o.TgZ(2,"div",5),o._UZ(3,"div",6)(4,"div",7)(5,"div",8),o.qZA()()}if(2&r){const t=o.oxw();o.Q6J("@arrowOpacity",t._getArrowViewState())("@arrowPosition",t._getArrowViewState())("@allowChildren",t._getArrowDirectionState()),o.xp6(2),o.Q6J("@indicator",t._getArrowDirectionState()),o.xp6(1),o.Q6J("@leftPointer",t._getArrowDirectionState()),o.xp6(1),o.Q6J("@rightPointer",t._getArrowDirectionState())}}const l=["*"],T=new o.OlP("MAT_SORT_DEFAULT_OPTIONS"),B=(0,_.dB)((0,_.Id)(class{}));let x=(()=>{class r extends B{get direction(){return this._direction}set direction(t){this._direction=t}get disableClear(){return this._disableClear}set disableClear(t){this._disableClear=(0,S.Ig)(t)}constructor(t){super(),this._defaultOptions=t,this.sortables=new Map,this._stateChanges=new M.x,this.start="asc",this._direction="",this.sortChange=new o.vpe}register(t){this.sortables.set(t.id,t)}deregister(t){this.sortables.delete(t.id)}sort(t){this.active!=t.id?(this.active=t.id,this.direction=t.start?t.start:this.start):this.direction=this.getNextSortDirection(t),this.sortChange.emit({active:this.active,direction:this.direction})}getNextSortDirection(t){if(!t)return"";let n=function y(r,s){let t=["asc","desc"];return"desc"==r&&t.reverse(),s||t.push(""),t}(t.start||this.start,t?.disableClear??this.disableClear??!!this._defaultOptions?.disableClear),f=n.indexOf(this.direction)+1;return f>=n.length&&(f=0),n[f]}ngOnInit(){this._markInitialized()}ngOnChanges(){this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}}return r.\u0275fac=function(t){return new(t||r)(o.Y36(T,8))},r.\u0275dir=o.lG2({type:r,selectors:[["","matSort",""]],hostAttrs:[1,"mat-sort"],inputs:{disabled:["matSortDisabled","disabled"],active:["matSortActive","active"],start:["matSortStart","start"],direction:["matSortDirection","direction"],disableClear:["matSortDisableClear","disableClear"]},outputs:{sortChange:"matSortChange"},exportAs:["matSort"],features:[o.qOj,o.TTD]}),r})();const h=_.mZ.ENTERING+" "+_.yN.STANDARD_CURVE,u={indicator:(0,e.X$)("indicator",[(0,e.SB)("active-asc, asc",(0,e.oB)({transform:"translateY(0px)"})),(0,e.SB)("active-desc, desc",(0,e.oB)({transform:"translateY(10px)"})),(0,e.eR)("active-asc <=> active-desc",(0,e.jt)(h))]),leftPointer:(0,e.X$)("leftPointer",[(0,e.SB)("active-asc, asc",(0,e.oB)({transform:"rotate(-45deg)"})),(0,e.SB)("active-desc, desc",(0,e.oB)({transform:"rotate(45deg)"})),(0,e.eR)("active-asc <=> active-desc",(0,e.jt)(h))]),rightPointer:(0,e.X$)("rightPointer",[(0,e.SB)("active-asc, asc",(0,e.oB)({transform:"rotate(45deg)"})),(0,e.SB)("active-desc, desc",(0,e.oB)({transform:"rotate(-45deg)"})),(0,e.eR)("active-asc <=> active-desc",(0,e.jt)(h))]),arrowOpacity:(0,e.X$)("arrowOpacity",[(0,e.SB)("desc-to-active, asc-to-active, active",(0,e.oB)({opacity:1})),(0,e.SB)("desc-to-hint, asc-to-hint, hint",(0,e.oB)({opacity:.54})),(0,e.SB)("hint-to-desc, active-to-desc, desc, hint-to-asc, active-to-asc, asc, void",(0,e.oB)({opacity:0})),(0,e.eR)("* => asc, * => desc, * => active, * => hint, * => void",(0,e.jt)("0ms")),(0,e.eR)("* <=> *",(0,e.jt)(h))]),arrowPosition:(0,e.X$)("arrowPosition",[(0,e.eR)("* => desc-to-hint, * => desc-to-active",(0,e.jt)(h,(0,e.F4)([(0,e.oB)({transform:"translateY(-25%)"}),(0,e.oB)({transform:"translateY(0)"})]))),(0,e.eR)("* => hint-to-desc, * => active-to-desc",(0,e.jt)(h,(0,e.F4)([(0,e.oB)({transform:"translateY(0)"}),(0,e.oB)({transform:"translateY(25%)"})]))),(0,e.eR)("* => asc-to-hint, * => asc-to-active",(0,e.jt)(h,(0,e.F4)([(0,e.oB)({transform:"translateY(25%)"}),(0,e.oB)({transform:"translateY(0)"})]))),(0,e.eR)("* => hint-to-asc, * => active-to-asc",(0,e.jt)(h,(0,e.F4)([(0,e.oB)({transform:"translateY(0)"}),(0,e.oB)({transform:"translateY(-25%)"})]))),(0,e.SB)("desc-to-hint, asc-to-hint, hint, desc-to-active, asc-to-active, active",(0,e.oB)({transform:"translateY(0)"})),(0,e.SB)("hint-to-desc, active-to-desc, desc",(0,e.oB)({transform:"translateY(-25%)"})),(0,e.SB)("hint-to-asc, active-to-asc, asc",(0,e.oB)({transform:"translateY(25%)"}))]),allowChildren:(0,e.X$)("allowChildren",[(0,e.eR)("* <=> *",[(0,e.IO)("@*",(0,e.pV)(),{optional:!0})])])};let b=(()=>{class r{constructor(){this.changes=new M.x}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=o.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();const O={provide:b,deps:[[new o.FiY,new o.tp0,b]],useFactory:function I(r){return r||new b}},P=(0,_.Id)(class{});let H=(()=>{class r extends P{get sortActionDescription(){return this._sortActionDescription}set sortActionDescription(t){this._updateSortActionDescription(t)}get disableClear(){return this._disableClear}set disableClear(t){this._disableClear=(0,S.Ig)(t)}constructor(t,i,n,f,Y,j,N,C){super(),this._intl=t,this._changeDetectorRef=i,this._sort=n,this._columnDef=f,this._focusMonitor=Y,this._elementRef=j,this._ariaDescriber=N,this._showIndicatorHint=!1,this._viewState={},this._arrowDirection="",this._disableViewStateAnimation=!1,this.arrowPosition="after",this._sortActionDescription="Sort",C?.arrowPosition&&(this.arrowPosition=C?.arrowPosition),this._handleStateChanges()}ngOnInit(){!this.id&&this._columnDef&&(this.id=this._columnDef.name),this._updateArrowDirection(),this._setAnimationTransitionState({toState:this._isSorted()?"active":this._arrowDirection}),this._sort.register(this),this._sortButton=this._elementRef.nativeElement.querySelector(".mat-sort-header-container"),this._updateSortActionDescription(this._sortActionDescription)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{const i=!!t;i!==this._showIndicatorHint&&(this._setIndicatorHintVisible(i),this._changeDetectorRef.markForCheck())})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._sort.deregister(this),this._rerenderSubscription.unsubscribe()}_setIndicatorHintVisible(t){this._isDisabled()&&t||(this._showIndicatorHint=t,this._isSorted()||(this._updateArrowDirection(),this._setAnimationTransitionState(this._showIndicatorHint?{fromState:this._arrowDirection,toState:"hint"}:{fromState:"hint",toState:this._arrowDirection})))}_setAnimationTransitionState(t){this._viewState=t||{},this._disableViewStateAnimation&&(this._viewState={toState:t.toState})}_toggleOnInteraction(){this._sort.sort(this),("hint"===this._viewState.toState||"active"===this._viewState.toState)&&(this._disableViewStateAnimation=!0)}_handleClick(){this._isDisabled()||this._sort.sort(this)}_handleKeydown(t){!this._isDisabled()&&(t.keyCode===v.L_||t.keyCode===v.K5)&&(t.preventDefault(),this._toggleOnInteraction())}_isSorted(){return this._sort.active==this.id&&("asc"===this._sort.direction||"desc"===this._sort.direction)}_getArrowDirectionState(){return`${this._isSorted()?"active-":""}${this._arrowDirection}`}_getArrowViewState(){const t=this._viewState.fromState;return(t?`${t}-to-`:"")+this._viewState.toState}_updateArrowDirection(){this._arrowDirection=this._isSorted()?this._sort.direction:this.start||this._sort.start}_isDisabled(){return this._sort.disabled||this.disabled}_getAriaSortAttribute(){return this._isSorted()?"asc"==this._sort.direction?"ascending":"descending":"none"}_renderArrow(){return!this._isDisabled()||this._isSorted()}_updateSortActionDescription(t){this._sortButton&&(this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription),this._ariaDescriber?.describe(this._sortButton,t)),this._sortActionDescription=t}_handleStateChanges(){this._rerenderSubscription=(0,D.T)(this._sort.sortChange,this._sort._stateChanges,this._intl.changes).subscribe(()=>{this._isSorted()&&(this._updateArrowDirection(),("hint"===this._viewState.toState||"active"===this._viewState.toState)&&(this._disableViewStateAnimation=!0),this._setAnimationTransitionState({fromState:this._arrowDirection,toState:"active"}),this._showIndicatorHint=!1),!this._isSorted()&&this._viewState&&"active"===this._viewState.toState&&(this._disableViewStateAnimation=!1,this._setAnimationTransitionState({fromState:"active",toState:this._arrowDirection})),this._changeDetectorRef.markForCheck()})}}return r.\u0275fac=function(t){return new(t||r)(o.Y36(b),o.Y36(o.sBO),o.Y36(x,8),o.Y36("MAT_SORT_HEADER_COLUMN_DEF",8),o.Y36(g.tE),o.Y36(o.SBq),o.Y36(g.$s,8),o.Y36(T,8))},r.\u0275cmp=o.Xpm({type:r,selectors:[["","mat-sort-header",""]],hostAttrs:[1,"mat-sort-header"],hostVars:3,hostBindings:function(t,i){1&t&&o.NdJ("click",function(){return i._handleClick()})("keydown",function(f){return i._handleKeydown(f)})("mouseenter",function(){return i._setIndicatorHintVisible(!0)})("mouseleave",function(){return i._setIndicatorHintVisible(!1)}),2&t&&(o.uIk("aria-sort",i._getAriaSortAttribute()),o.ekj("mat-sort-header-disabled",i._isDisabled()))},inputs:{disabled:"disabled",id:["mat-sort-header","id"],arrowPosition:"arrowPosition",start:"start",sortActionDescription:"sortActionDescription",disableClear:"disableClear"},exportAs:["matSortHeader"],features:[o.qOj],attrs:d,ngContentSelectors:l,decls:4,vars:7,consts:[[1,"mat-sort-header-container","mat-focus-indicator"],[1,"mat-sort-header-content"],["class","mat-sort-header-arrow",4,"ngIf"],[1,"mat-sort-header-arrow"],[1,"mat-sort-header-stem"],[1,"mat-sort-header-indicator"],[1,"mat-sort-header-pointer-left"],[1,"mat-sort-header-pointer-right"],[1,"mat-sort-header-pointer-middle"]],template:function(t,i){1&t&&(o.F$t(),o.TgZ(0,"div",0)(1,"div",1),o.Hsn(2),o.qZA(),o.YNc(3,c,6,6,"div",2),o.qZA()),2&t&&(o.ekj("mat-sort-header-sorted",i._isSorted())("mat-sort-header-position-before","before"===i.arrowPosition),o.uIk("tabindex",i._isDisabled()?null:0)("role",i._isDisabled()?null:"button"),o.xp6(3),o.Q6J("ngIf",i._renderArrow()))},dependencies:[p.O5],styles:[".mat-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container,[mat-sort-header].cdk-program-focused .mat-sort-header-container{border-bottom:solid 1px currentColor}.mat-sort-header-disabled .mat-sort-header-container{cursor:default}.mat-sort-header-container::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-sort-header-content{text-align:center;display:flex;align-items:center}.mat-sort-header-position-before{flex-direction:row-reverse}.mat-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.mat-sort-header-arrow,[dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow{margin:0 0 0 6px}.mat-sort-header-position-before .mat-sort-header-arrow,[dir=rtl] .mat-sort-header-arrow{margin:0 6px 0 0}.mat-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.cdk-high-contrast-active .mat-sort-header-stem{width:0;border-left:solid 2px}.mat-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.mat-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.cdk-high-contrast-active .mat-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}.cdk-high-contrast-active .mat-sort-header-pointer-left,.cdk-high-contrast-active .mat-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}.mat-sort-header-pointer-left{transform-origin:right;left:0}.mat-sort-header-pointer-right{transform-origin:left;right:0}"],encapsulation:2,data:{animation:[u.indicator,u.leftPointer,u.rightPointer,u.arrowOpacity,u.arrowPosition,u.allowChildren]},changeDetection:0}),r})(),k=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({providers:[O],imports:[p.ez,_.BQ]}),r})()},3683:(E,w,a)=>{a.d(w,{g0:()=>p});var o=a(4650),g=a(3238);let p=(()=>{class d{}return d.\u0275fac=function(l){return new(l||d)},d.\u0275mod=o.oAB({type:d}),d.\u0275inj=o.cJS({imports:[g.BQ,g.BQ]}),d})()}}]);