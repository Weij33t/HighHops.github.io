window['__jsonp_ym_combine_,,7H_C_D:k:c,Q,Z,E:a:b_*'](
[
[',,', function (ym) {
ym.modules.define("yandex.layer.poi",["util.Associate","util.defineClass","util.array","map.associate.serviceLayers","vow","hotspot.Layer","hotspot.layer.ObjectSource","yandex.layers","layer.optionMapper","event.Manager","Event","poi.BalloonManager","hotspot.layer.Hint","hotspot.layer.addon.balloon","yandex.layer.metaOptions"],function(e,t,r,o,n,i,s,a,l,y,h,u){function d(e,t){return[p(e,t),p(e,"hotspotLayer"),e]}function p(e,t){return t+e.slice(0,1).toUpperCase()+e.slice(1)}var _=function(e){this.events=new h,this._map=e,this._layers=[],this._layer=null,this._layerDeferred=new i.Deferred,this._childEventController={onAfterEventFiring:function(e,t,r){t.indexOf("defaultaction")==-1&&this.events.fire(t,new u({},r))}.bind(this)}},c=new t(function(e){return new _(e)});_.PoiWanstAdded=_.PoiWasRemoved=_.NoPoiPresent=function(){return new Error("No POI layer present")},r(_,{isEnabled:function(){return this._layers.length>0},addLayer:function(e,t){o.indexOf(this._layers,e)==-1&&(this._layers.push(e),this._updateHotspotLayer(t&&t.hotspotLayer||this._createHotspotLayer(e.getAlias())))},removeLayer:function(e){var t=o.indexOf(this._layers,e);t>-1&&(this._layers.splice(t,1),0==this._layers.length&&this._teardownPoi())},getHostpotLayer:function(){return this.getHotspotLayer()},getHostpotLayerSync:function(){return this.getHotspotLayerSync()},getHotspotLayer:function(){return this._layer?i.resolve(this._layer):i.reject(_.NoPoiPresent())},getHotspotLayerSync:function(){return this._layer},getHotspotLayerAsync:function(){return this._layerDeferred.promise()},_setupPoi:function(e){this._layer=e,this._layer.options.setName("poi"),this._layer.events.addController(this._childEventController),n.get(this._map).add(this._layer),this._layerDeferred.resolve(this._layer)},_teardownPoi:function(){this._layer&&(n.get(this._map).remove(this._layer),this._layer.events.removeController(this._childEventController),this._layer=null),this._layerDeferred=new i.Deferred},_createHotspotLayer:function(e){var t=e+"j",r=ym.env.layers[e].hotspotZoomRange,o="%c&l="+t,n=l.getTileUrlTemplate(t,e),i=new a(n,o,{coordOrder:"latlong",minZoom:r[0],maxZoom:r[1]});return new s(i,{tilesRoundingMethod:this._map.options.get("tilesRoundingMethod")})},_updateHotspotLayer:function(e){this._layer!=e&&(this._teardownPoi(),this._setupPoi(e))}}),y.setRule({name:"poi",rule:d}),e(c)});}],
['7H', function (ym) {
ym.modules.define("map.associate.serviceLayers",["util.Associate","map.layer.Manager"],function(e,r,a){var n=new r(function(e){return new a(e)});e({get:function(e){if(ym.env.debug&&!e)throw new Error("map.associate.serviceLayers: передан пустой указатель на карту");return n.get(e)}})});}],
['_C', function (ym) {
ym.modules.define("poi.BalloonManager",["util.defineClass","hotspot.layer.Balloon","poi.fetcher","popup.managerStorage","meta.internal","util.array","vow","yandex.state.component.PoiBalloon","yandex.counter","system.browser","helper.theme.islands.islets.search.layout.Card"],function(t,e,o,i,n,r,s,a,p,c,l,h){var u=function(t){u.superclass.constructor.call(this,t),this._yandexStateComponent=new p(this),this.events.add("close",function(){this.events.fire("activeobjectchange",{activeObject:null})},this)};e(u,o,{destroy:function(){return this._yandexStateComponent.destroy(),u.superclass.destroy.call(this)},hotspotOpen:function(t){var e=t.getGeometry(),o=this._hotspotLayer.getMap(),i=o.getZoom();return this._getPoiDataAndOpen(t,o.options.get("projection").toGlobalPixels(e.coordinates,i),i)},open:function(t,e,o){var i=this._hotspotLayer.getMap();this._countCardShow(e);var n;return n="stop"==e.properties.get("type")?{type:e.properties.get("type"),mode:"stop",stopId:e.properties.get("mtrData.id")}:{type:e.properties.get("type"),uri:e.properties.get("uri"),point:e.properties.get("point")},this.events.fire("activeobjectchange",{activeObject:n,map:i}),u.superclass.open.call(this,t,e,o)},onClickDefault:function(t){var e=this._hotspotLayer.options;if(e.get("openBalloonOnClick",!0)){var o=this._hotspotLayer.getMap(),i=o.getZoom(),n=t.get("originalEvent"),r=n.get("activeObject"),s=r.getGeometry(),a=s&&s.coordinates?o.options.get("projection").toGlobalPixels(s.coordinates,i):n.get("globalPixels");this._getPoiDataAndOpen(r,a,i)}},_countCardShow:function(t){var e=h.getCardType(t.properties),o=e==h.CARD_TYPES.transport?e:t.properties.get("type","unknown");c.countByKey("modulesUsage",{path:"poi.showCard."+o+"."+l.platform,share:.1})},_getPoiDataAndOpen:function(t,e,o){var n=a.defer(),s=this._hotspotLayer.getMap();return i.getProperties(t,o).then(function(t){var i={properties:t,map:s},a={displayAdvert:r.displayAdvert||s.options.get("forceAdvert")},p={initialPosition:e,initialZoom:o,map:s};n.resolve(this._checkEmptinessAndOpen(p,i,a))},this),n.promise()},_checkEmptinessAndOpen:function(t,e,o){var i=a.defer();return this._hotspotLayer.options.get("openEmptyBalloon",!1)?i.resolve(this._checkMapActionAndOpen(t,e,o)):this.isEmpty(t.initialPosition,e,o).then(function(n){n||i.resolve(this._checkMapActionAndOpen(t,e,o))},this),i.promise()},_checkMapActionAndOpen:function(t,e,o){var i=this._recountPosition(t);return i?this.open(i,e,o):a.reject()},_recountPosition:function(t){if(t.map.action.getCurrentState().isTicking)return null;var e=t.map.getZoom(),o=Math.pow(2,e-t.initialZoom),i=t.initialPosition.slice();return 1!=o&&(i=[i[0]*o,i[1]*o]),i}}),n.add("poi#balloon",u),t(u)});}],
['_D', function (ym) {
ym.modules.define("poi.fetcher",["util.defineClass","data.Manager","yandex.searchProvider.search","util.safeAccess","util.array","util.extend","util.coordinates.toLatLong","meta.internal","error","vow","localization.common.current","formatter","util.coordinates.convert","searchResult.transportDataProvider","searchResult.util","yandex.masstransitStopProvider","util.coordinates.reverse"],function(e,t,r,n,i,o,a,s,u,c,g,p,l,d,f,m,h,v){function y(e,t){var r=R(e,t);return I[r]||(I[r]=P(e,t))}function R(e,t){return x(e.getProperties())||e.getGeometry().coordinates.join(",")+"_"+t}function x(e){return i(e,"URIMetaData.URIs.0.uri")}function U(e){for(var t=i(e.getProperties(),"URIMetaData.URIs"),r=0,n=t.length;r<n;r++)if(t[r].uri.indexOf("transit/stop")!=-1)return!0;return!1}function M(e){return e.properties}function P(e,t){var r=e.getProperties(),n=(i(r,"HotspotMetaData.tags"),x(r)),o=s(e.getGeometry().coordinates);return U(e)?D(o,t,r,n).then(M):n?w(n).then(f.remoteExtendOrgWithTransport).then(M).fail(function(){return O(o,t,r,n).then(M)}):O(o,t,r,n).then(f.remoteExtendWithTaxi).then(M)}function w(e){return n.search(null,a({uri:e,source:"poi"},S)).then(function(t){var r=t.geoObjects.get(0);return r?(r.properties.set({uri:e,point:s(r.geometry.getCoordinates()).reverse()}),m.isBusiness(r.properties)&&j(r),r):g.reject("Nothing found")})}function D(e,t,r,n){var o=d(e,"latlong",ym.env.coordinatesOrder),a=f.requestMetroCoverage(o,t),s=O(e,t,r,n),u=h.getStopByUri(n).then(void 0,function(e){return null});return g.all([s,u,a]).then(function(e){var t=e[0],r=e[1],n=e[2],o=i(r,"properties.StopMetaData");return o?f.extendWithStop(t,o,n&&n.length>0):t})}function O(e,t,o,s){return n.search(e.join(","),a({source:"poi",zoom:t,boundedBy:[[e[0]-C,e[1]-C],[e[0]+C,e[1]+C]]},S)).then(function(t){var n=t.geoObjects.get(0),u={uri:s,point:v(e),type:"poi"};if(!n)return new r(a(u,o));var c=n.properties,g=o.name,p=i(o,"HotspotMetaData.TagsMetaData.org_type");return c.set(u),(g||p)&&(c.set({name:g||p,address:c.get("name")}),p&&c.set("categoriesText",p)),n})}function j(e){var t=e.properties,r=p.ppo.Card,n=t.get("rating.reviews",0),i=t.get("rating.ratings",0);t.set("loc",{timeClosedUntil:r.timeClosedUntil.replace("%s",t.get("workingStatus.time","")),timeOpenUntil:r.timeOpenUntil.replace("%s",t.get("workingStatus.time","")),ratingReviews:l.numeral(n,r.ratingReviews),ratingRatings:l.numeral(i,r.ratingRatings)})}var C=.001,S={origin:"jsapi2Poi",results:1,pin:!0},I={};e({getProperties:y})});}],
[':k', function (ym) {
ym.modules.define("yandex.state.component.PoiBalloon",["util.defineClass","yandex.state.associate"],function(e,t,n){function a(e){this._balloonManager=e,e.events.add("activeobjectchange",this._onChange,this)}t(a,{destroy:function(){this._balloonManager.events.remove("activeobjectchange",this._onChange,this)},_onChange:function(e){this._yandexState||(this._yandexState=n.get(e.get("map"))),this._yandexState.setActiveObject(e.get("activeObject"))}}),e(a)});}],
[':c', function (ym) {
ym.modules.define({name:"yandex.searchProvider.search",key:"yandex#search",storage:"yandex.searchProvider",depends:["yandex.searchProvider.storage","yandex.searchProvider.responseParser","yandex.timeZone","projection.wgs84Mercator","util.jsonp","util.bounds","util.array","util.extend","util.safeAccess","vow","meta","meta.internal"],declaration:function(e,r,t,s,n,a,o,i,d,u,c,l,p){var y=["businessrating/1.x","masstransit/1.x"],m=["data","properties","ResponseMetaData","SearchResponse","SourceMetaDataList","GeocoderResponseMetaData","Point","coordinates"].join("."),v={search:function(e,r){r=r||{};var s=ym.env.coordinatesOrder;i.isArray(e)&&("longlat"==s&&(e=[e[1],e[0]]),e=e.join(","));var d=ym.env.hosts.api.services.search+"v2/",u={format:"json",lang:ym.env.lang,token:ym.env.token,rspn:r.strictBounds?1:0,results:r.results||10,skip:r.skip,origin:r.origin||"jsapi2Search",snippets:y,ask_direct:p.displayAdvert?1:0,experimental_maxadv:p.displayAdvert?200:0,apikey:ym.env.apikey},l=c.defer();if(r.uri?(u.mode="uri",u.uri=r.uri):u.text=e,r.pin&&(u.geocoder_pin=1),r.boundedBy){var m=o.toCenterAndSpan(r.boundedBy,n),v=m.ll,f=m.spn;"longlat"!=s&&(v.reverse(),f.reverse()),u.ll=v,u.spn=f}r.zoom&&(u.z=r.zoom),r.searchType&&(u.type=r.searchType),"undefined"!=typeof r.correct_misspell&&(u.correct_misspell=r.correct_misspell);var g={url:d,requestParams:u,postprocessUrl:function(e){return ym.env.hostConfigQuery?e+"&"+ym.env.hostConfigQuery:e}};return a(g).then(this._adjustCoordSearch).then(this._addTimeZoneToResponse).then(function(e){if(r.json)l.resolve(e);else{if("success"!=e.status)return l.reject({message:"Bad response",status:e.status});var s=t.parseResults(e.data,e.timeZone);l.resolve({geoObjects:s,responseMetaData:e.data.properties.ResponseMetaData})}},function(e){l.reject(e)}),l.promise()},suggest:function(e,r){r=r||{};var t=ym.env.hosts.api.services.suggest+"suggest-geo",s={v:"5",search_type:"all",part:e,lang:ym.env.lang,n:r.results||5,origin:"jsapi2Geocoder"},n="longlat"!=ym.env.coordinatesOrder;return r.boundedBy?(s.bbox=[r.boundedBy[0][n?1:0],r.boundedBy[0][n?0:1],r.boundedBy[1][n?1:0],r.boundedBy[1][n?0:1]].join(","),s.local_only=r.strictBounds?"1":"0"):s.bbox="-180,-90,180,90",a({url:t,requestParams:s,paramName:"callback",timeout:r.timeout||3e4}).then(function(e){for(var r=[],t=0,s=e[1].length;t<s;t++){var n=e[1][t],a=n[0],o={type:n[0],displayName:n[1]};"geo"==a&&(o.value=n[2],o.hl=n[3].hl),"biz"==a&&(o.value=n[1],o.hl=n[2].hl),r.push(o)}return r},function(e){return e})},_adjustCoordSearch:function(e){var r=Boolean(u(e,"data.features.length")),t=u(e,m);return r&&t&&i.each(e.data.features,function(e){o.containsPoint(e.properties.boundedBy,t)&&(e.geometry.coordinates=t)}),e},_addTimeZoneToResponse:function(e){if(e.data&&e.data.features.length){var r=e.data.features[0],t=r.geometry.coordinates,n=c.defer();return"longlat"!=l.coordinatesOrder&&(t=[t[1],t[0]]),s.get(t,10).then(function(r){n.resolve(d(e,{timeZone:{geoPoint:t,offset:r.offset,dst:r.dst}}))},function(){n.resolve(e)}),n.promise()}return c.resolve(e)}};e(v)}});}],
[',Q', function (ym) {
ym.modules.define("yandex.masstransitStopProvider",["vow","util.crossDomainXhr","util.json","util.querystring"],function(r,n,t,e,s){function i(r){var n={uri:r,lang:ym.env.lang};return a+o+"?"+s.stringify(n)}var a=ym.env.hosts.api.services.route,o="v2/masstransit/stop",u={};u.getStopByUri=function(r){var n=i(r),s=ym.env.server.params.csp,a=s&&parseFloat(s.version)>=2;return t(n,{headers:{Accept:"application/json"}},a).then(function(r){var n=e.from(r);return n[0]})},r(u)});}],
[',Z', function (ym) {
ym.modules.define("yandex.searchProvider.responseParser",["GeoObjectCollection","GeoObject","util.Time","yandex.searchProvider.parser.WorkingTimeModel","yandex.searchProvider.parser.WorkingTimeDayModel","coordSystem.geo","meta","util.array","util.extend","util.coordinates.reverse","searchResult.factory"],function(e,t,r,a,o,s,n,i,u,d,c,l){function p(e,r){var a=e.properties.ResponseMetaData,o=a.SearchResponse,s=a.SearchRequest,n=o.boundedBy,i=[],d=!0,l=!1;return u.each(e.features,function(e){if("Feature"===e.type)i.push(y(e,r));else if("FeatureCollection"===e.type&&d){var t=p(e);t.getLength()?(t.properties.set({type:"alternative"}),i.push(t)):l=!0,d=!1}}),n&&w&&(n=c(n)),o.boundedBy&&(o.boundedBy=n),new t({children:i,properties:{found:o.found,results:s.results,resultsArray:i,skip:s.skip,request:s.request,correction:s.suggest,suggest:s.suggest,boundedBy:n,display:o.display,requestContext:o.context,isAlternative:l,counter:o.counter,responseMetaData:a}})}function y(e,t){var a=e.properties,o=e.geometry.coordinates,s={};if(a){var i=a.CompanyMetaData,p=a.GeocoderMetaData,y=a.PSearchObjectMetaData,g=i||p||y;if(d(s,{name:a.name,description:a.description,boundedBy:a.boundedBy,responseMetaData:g,uriMetaData:a.URIMetaData}),i){var k=i.Advert,D=i.Categories,M=i.Phones;d(s,{type:"business",companyMetaData:i,id:i.id,address:i.address,url:i.url}),D&&(D=u.map(D,v),d(s,{categories:D,categoriesText:u.map(D,h).join(", ")})),M&&(M=u.map(i.Phones,b),M=[M.shift()].concat(M.sort()),s.phoneNumbers=M),k&&(s.advert={title:k.title,text:k.text,url:k.url,disclaimers:k.disclaimers,counter:k.counter})}else if(p)d(s,l.createToponymFromGeocoderData(p));else if(y){d(s,{type:"public-map-object",publicMapMetaData:y,kind:y.kind,categoriesText:y.category,address:y.address});var x=y.internal;x&&d(s,{url:x.url,phones:[x.phone]})}var T=g.Hours;if(T&&T.Availabilities){var S,P=f(T.Availabilities),B=w?[o[1],o[0]]:o;t&&n.getDistance(t.geoPoint,B)<5e4&&(S=m(P,t.offset)),d(s,{workingTime:T.text,workingStatus:S,workingTimeModel:P})}T&&!T.Availabilities&&d(s,{workingTime:T.short_text||T.text,workingStatus:{isWork:!1,closedPermanently:!0}});var W=a.Stops;W&&(s.stops=u.map(W.items,function(e){return{name:e.name,distance:e.Distance.text,color:e.Style.color,coordinates:e.Point.coordinates}}));var A=a.BusinessRating;A&&(s.rating={ratings:A.ratings,reviews:A.reviews,score:A.score})}return w&&(o=c(o),e.geometry.coordinates=o,s.boundedBy=c(s.boundedBy)),new r({geometry:e.geometry,properties:s})}function f(e){var t=new Array(7);return u.each(e,function(e){var r,a=g(e);if(e.Everyday)for(r=0;r<7;r++)t[r]=a;else if(e.Weekdays)for(r=1;r<6;r++)t[r]=a;else if(e.Weekend)t[6]=a,t[0]=a;else for(var o in e)e.hasOwnProperty(o)&&(r=k[o],void 0!==r&&(t[r]=a))}),new o(t)}function g(e){var t=[];return e.TwentyFourHours?t.push({from:new a,to:new a}):u.each(e.Intervals,function(e){t.push({from:a.parse(e.from),to:a.parse(e.to)})}),new s(t)}function m(e,t){var r=new Date,o=r.getTimezoneOffset()/60+t/3600;r.setHours(r.getHours()+o);var s=new a(r.getHours(),r.getMinutes()),n=e.getStatus(r.getDay(),s),i=n.isWork,u=n.interval;return{isWork:i,time:u&&(i?u.to:u.from).getString()}}function v(e){return e.name}function h(e,t){return t>0&&(e=e.toLowerCase()),e}function b(e){return e.formatted}var w="longlat"!=i.coordinatesOrder,k={Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:0};e({parseResults:p})});}],
[',E', function (ym) {
ym.modules.define("util.Time",["util.defineClass"],function(t,u){function n(t,u){this._hours=t||0,this._minutes=u||0}function i(t){var u=t.toString();return 1===u.length&&(u="0"+u),u}var r=/^(\d{2}):(\d{2})(?::\d{2})?$/;u(n,{getHours:function(){return this._hours},getMinutes:function(){return this._minutes},isBefore:function(t){var u=t.getHours();return this._hours<u||this._hours===u&&this._minutes<t.getMinutes()},isAfter:function(t){var u=t.getHours();return this._hours>u||this._hours===u&&this._minutes>t.getMinutes()},equals:function(t){return this._hours===t.getHours()&&this._minutes===t.getMinutes()},isMidnight:function(){return this._hours+this._minutes===0},getString:function(){return i(this._hours)+":"+i(this._minutes)}}),n.parse=function(t){var u=t.match(r);if(!u)return null;var i=Number(u[1]);if(i<0||i>23)return null;var s=Number(u[2]);return s<0||s>59?null:new n(i,s)},t(n)});}],
[':a', function (ym) {
ym.modules.define("yandex.searchProvider.parser.WorkingTimeModel",["util.defineClass"],function(i,e){function r(i){this._availabilities=i}e(r,{getAvailabilities:function(){return this._availabilities},getStatus:function(i,e){var r,t=this._availabilities[i];if(!t)return r=this._includeInPrevDay(i,e),r?{isWork:!0,interval:r}:{isWork:!1};if(t.isTwentyFourHours())return{isWork:!0};for(var n=t.getTimeIntervals(),s=0;s<n.length;s++){var a=n[s],o=a.from,l=a.to;if(e.isBefore(o))return 0===s&&(r=this._includeInPrevDay(i,e))?{isWork:!0,interval:r}:{isWork:!1,interval:a};if((e.isAfter(o)||e.equals(o))&&(e.isBefore(l)||l.isBefore(o)))return{isWork:!0,interval:a}}return{isWork:!1}},_includeInPrevDay:function(i,e){var r=(i-1+7)%7,t=this._availabilities[r];if(t){var n,s=t.getTimeIntervals(),a=s.length;if(a&&(n=s[a-1],n.to.isBefore(n.from)&&e.isBefore(n.to)))return n}}}),i(r)});}],
[':b', function (ym) {
ym.modules.define("yandex.searchProvider.parser.WorkingTimeDayModel",["util.defineClass"],function(i,n){function e(i){this._intervals=i}n(e,{getTimeIntervals:function(){return this._intervals},isTwentyFourHours:function(){if(1===this._intervals.length){var i=this._intervals[0];return i.from.isMidnight()&&i.to.isMidnight()}return!1}}),i(e)});}],
['_*', function (ym) {
ym.modules.define("searchResult.factory",["searchResult.types"],function(e,t){var o={};o.createToponymFromGeocoderData=function(e){var o=e.text.split(",");return o="house"==e.kind||"metro"==e.kind?o.slice(0,o.length-2):o.slice(0,o.length-1),{type:t.toponym,geocoderMetaData:e,description:o.join(","),address:e.text,kind:e.kind}},e(o)});}]
]
);