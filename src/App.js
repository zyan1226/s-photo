import React, { Component } from 'react'
import './App.css';
import { Input, Image, Space, Select, FloatButton, Avatar, Button, Modal, Tooltip, Descriptions, Radio, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, CameraOutlined, InfoOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

export default class App extends Component {


  state = {
    currentOperatingImgData: {
      location: {},
      user: {
        profile_image: {},
        links: {}
      },
      exif: {},
      urls: {}
    },
    showImgInfoFlag: false,
    showExifModalFlag: false,
    query: '',
    apiSuccess: false,
    searchSuccess: true,
    orientationSelected: 'landscape',
    orientationSelectArray: [
      { value: 'landscape', label: '横向' },
      { value: 'portrait', label: '竖向' },
      { value: 'squarish', label: '方形' }
    ],
    pageSizeSelected: 6,
    pageSizeSelectArray: [
      { value: 6, label: '获取 6 张' },
      { value: 18, label: '获取 18 张' },
      { value: 30, label: '获取 30 张' },
    ],
    prevImgData: [],
    imgData: [{ "id": "830UMaXyR6Y", "created_at": "2023-02-22T23:27:53Z", "updated_at": "2023-03-11T13:42:09Z", "promoted_at": "2023-02-23T17:40:01Z", "width": 6240, "height": 4160, "color": "#26260c", "blur_hash": "LBB:1qE54p4;Na$zWYo20h-T9wxu", "description": null, "alt_description": "a city street at night with traffic lights", "urls": { "raw": "https://images.unsplash.com/photo-1677108353411-62aed3a13c77?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1677108353411-62aed3a13c77?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1677108353411-62aed3a13c77?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1677108353411-62aed3a13c77?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1677108353411-62aed3a13c77?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1677108353411-62aed3a13c77" }, "links": { "self": "https://api.unsplash.com/photos/830UMaXyR6Y", "html": "https://unsplash.com/photos/830UMaXyR6Y", "download": "https://unsplash.com/photos/830UMaXyR6Y/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/830UMaXyR6Y/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 38, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": {}, "user": { "id": "oqCJlFNI1q0", "updated_at": "2023-03-07T13:50:50Z", "username": "angro", "name": "Antonio Grosz", "first_name": "Antonio", "last_name": "Grosz", "twitter_username": "angroofficial", "portfolio_url": null, "bio": null, "location": "Germany", "links": { "self": "https://api.unsplash.com/users/angro", "html": "https://unsplash.com/@angro", "photos": "https://api.unsplash.com/users/angro/photos", "likes": "https://api.unsplash.com/users/angro/likes", "portfolio": "https://api.unsplash.com/users/angro/portfolio", "following": "https://api.unsplash.com/users/angro/following", "followers": "https://api.unsplash.com/users/angro/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1576008816603-7780d0370150image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1576008816603-7780d0370150image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1576008816603-7780d0370150image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "antoniogrosz", "total_collections": 0, "total_likes": 0, "total_photos": 27, "accepted_tos": true, "for_hire": false, "social": { "instagram_username": "antoniogrosz", "portfolio_url": null, "twitter_username": "angroofficial", "paypal_email": null } }, "exif": { "make": null, "model": null, "name": null, "exposure_time": null, "aperture": null, "focal_length": null, "iso": null }, "location": { "name": null, "city": null, "country": null, "position": { "latitude": 0.0, "longitude": 0.0 } }, "views": 241994, "downloads": 1757 }, { "id": "djzMaIe9d1o", "created_at": "2023-02-27T10:13:32Z", "updated_at": "2023-03-11T22:40:36Z", "promoted_at": "2023-02-27T13:24:02Z", "width": 5865, "height": 3997, "color": "#f3f3f3", "blur_hash": "LPBzC4WB00of%MayM{j[4nof-;WB", "description": "Musee d’Orsay, Paris, France.", "alt_description": "a group of people standing in front of a large clock", "urls": { "raw": "https://images.unsplash.com/photo-1677492691756-a3433e656ea6?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1677492691756-a3433e656ea6?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1677492691756-a3433e656ea6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1677492691756-a3433e656ea6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1677492691756-a3433e656ea6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1677492691756-a3433e656ea6" }, "links": { "self": "https://api.unsplash.com/photos/djzMaIe9d1o", "html": "https://unsplash.com/photos/djzMaIe9d1o", "download": "https://unsplash.com/photos/djzMaIe9d1o/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/djzMaIe9d1o/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 28, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": { "arts-culture": { "status": "rejected" }, "architecture-interior": { "status": "approved", "approved_on": "2023-02-28T07:30:19Z" }, "street-photography": { "status": "rejected" }, "textures-patterns": { "status": "rejected" }, "experimental": { "status": "rejected" }, "travel": { "status": "rejected" }, "wallpapers": { "status": "rejected" } }, "user": { "id": "8HbRRiXyo7E", "updated_at": "2023-03-12T03:03:40Z", "username": "tompodmore86", "name": "Tom Podmore", "first_name": "Tom", "last_name": "Podmore", "twitter_username": "TomPodmore", "portfolio_url": null, "bio": "Nikon.", "location": "Nottingham", "links": { "self": "https://api.unsplash.com/users/tompodmore86", "html": "https://unsplash.com/@tompodmore86", "photos": "https://api.unsplash.com/users/tompodmore86/photos", "likes": "https://api.unsplash.com/users/tompodmore86/likes", "portfolio": "https://api.unsplash.com/users/tompodmore86/portfolio", "following": "https://api.unsplash.com/users/tompodmore86/following", "followers": "https://api.unsplash.com/users/tompodmore86/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1605087494426-7310e2a7d616image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1605087494426-7310e2a7d616image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1605087494426-7310e2a7d616image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "tompodmore86", "total_collections": 24, "total_likes": 0, "total_photos": 267, "accepted_tos": true, "for_hire": true, "social": { "instagram_username": "tompodmore86", "portfolio_url": null, "twitter_username": "TomPodmore", "paypal_email": null } }, "exif": { "make": "NIKON CORPORATION", "model": "NIKON D3300", "name": "NIKON CORPORATION, NIKON D3300", "exposure_time": "1/125", "aperture": "5.0", "focal_length": "38.0", "iso": 400 }, "location": { "name": "Musée d'Orsay, Rue de la Légion d'Honneur, Paris, France", "city": "Paris", "country": "France", "position": { "latitude": 48.859961, "longitude": 2.326561 } }, "views": 1593908, "downloads": 1912 }, { "id": "97tnf69Wyt0", "created_at": "2023-02-13T21:18:38Z", "updated_at": "2023-03-12T04:40:04Z", "promoted_at": "2023-02-14T06:32:01Z", "width": 6016, "height": 4016, "color": "#404026", "blur_hash": "LQD]et~qtRR*-:%Ls:fkE1IoM{M{", "description": null, "alt_description": "a squirrel climbing up the side of a tree", "urls": { "raw": "https://images.unsplash.com/photo-1676322560839-518075f59f13?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1676322560839-518075f59f13?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1676322560839-518075f59f13?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1676322560839-518075f59f13?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1676322560839-518075f59f13?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1676322560839-518075f59f13" }, "links": { "self": "https://api.unsplash.com/photos/97tnf69Wyt0", "html": "https://unsplash.com/photos/97tnf69Wyt0", "download": "https://unsplash.com/photos/97tnf69Wyt0/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/97tnf69Wyt0/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 30, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": {}, "user": { "id": "3jE2bOc7FA8", "updated_at": "2023-03-10T10:25:03Z", "username": "nbischop", "name": "Niklas Bischop", "first_name": "Niklas", "last_name": "Bischop", "twitter_username": null, "portfolio_url": null, "bio": "This is Nick, and this is the place for you to check out some free pictures!", "location": "Germany", "links": { "self": "https://api.unsplash.com/users/nbischop", "html": "https://unsplash.com/de/@nbischop", "photos": "https://api.unsplash.com/users/nbischop/photos", "likes": "https://api.unsplash.com/users/nbischop/likes", "portfolio": "https://api.unsplash.com/users/nbischop/portfolio", "following": "https://api.unsplash.com/users/nbischop/following", "followers": "https://api.unsplash.com/users/nbischop/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1626116000732-023a93a3efa2image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1626116000732-023a93a3efa2image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1626116000732-023a93a3efa2image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "nks.bp", "total_collections": 4, "total_likes": 202, "total_photos": 161, "accepted_tos": true, "for_hire": true, "social": { "instagram_username": "nks.bp", "portfolio_url": null, "twitter_username": null, "paypal_email": null } }, "exif": { "make": "NIKON CORPORATION", "model": "NIKON D750", "name": "NIKON CORPORATION, NIKON D750", "exposure_time": "1/640", "aperture": "6.3", "focal_length": "500.0", "iso": 8000 }, "location": { "name": null, "city": null, "country": null, "position": { "latitude": 0.0, "longitude": 0.0 } }, "views": 214491, "downloads": 2234 }, { "id": "ohC66RDnlXA", "created_at": "2023-02-17T15:20:59Z", "updated_at": "2023-03-12T06:39:06Z", "promoted_at": "2023-02-18T10:24:01Z", "width": 5469, "height": 3646, "color": "#d9d9d9", "blur_hash": "LfKUf#R+Dis:_NWCofae?HNGx]oL", "description": null, "alt_description": "a body of water surrounded by mountains and trees", "urls": { "raw": "https://images.unsplash.com/photo-1676647253166-1f1704cbc8ca?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1676647253166-1f1704cbc8ca?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1676647253166-1f1704cbc8ca?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1676647253166-1f1704cbc8ca?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1676647253166-1f1704cbc8ca?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1676647253166-1f1704cbc8ca" }, "links": { "self": "https://api.unsplash.com/photos/ohC66RDnlXA", "html": "https://unsplash.com/photos/ohC66RDnlXA", "download": "https://unsplash.com/photos/ohC66RDnlXA/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/ohC66RDnlXA/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 38, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": {}, "user": { "id": "XZDJrfKzdWY", "updated_at": "2023-03-11T20:03:27Z", "username": "eberhardgross", "name": "eberhard 🖐 grossgasteiger", "first_name": "eberhard 🖐", "last_name": "grossgasteiger", "twitter_username": null, "portfolio_url": null, "bio": "Photography is so incredibly complex, although seemingly simplistic.", "location": "South Tyrol, Italy", "links": { "self": "https://api.unsplash.com/users/eberhardgross", "html": "https://unsplash.com/@eberhardgross", "photos": "https://api.unsplash.com/users/eberhardgross/photos", "likes": "https://api.unsplash.com/users/eberhardgross/likes", "portfolio": "https://api.unsplash.com/users/eberhardgross/portfolio", "following": "https://api.unsplash.com/users/eberhardgross/following", "followers": "https://api.unsplash.com/users/eberhardgross/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "eberhard_grossgasteiger", "total_collections": 6, "total_likes": 4549, "total_photos": 1857, "accepted_tos": true, "for_hire": false, "social": { "instagram_username": "eberhard_grossgasteiger", "portfolio_url": null, "twitter_username": null, "paypal_email": null } }, "exif": { "make": "Canon", "model": " EOS 6D", "name": "Canon, EOS 6D", "exposure_time": "1/20", "aperture": "6.7", "focal_length": "17.0", "iso": 100 }, "location": { "name": null, "city": null, "country": null, "position": { "latitude": 0.0, "longitude": 0.0 } }, "views": 4162848, "downloads": 74348 }, { "id": "s0_FCjEFK3E", "created_at": "2023-03-01T22:40:25Z", "updated_at": "2023-03-11T22:40:40Z", "promoted_at": "2023-03-03T16:56:01Z", "width": 6588, "height": 4392, "color": "#f3d9c0", "blur_hash": "LdN+:_~pM|M_$KM{azt7D%RPayj]", "description": null, "alt_description": "a man riding a wave on top of a surfboard", "urls": { "raw": "https://images.unsplash.com/photo-1677709679024-fc005fb4feb2?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1677709679024-fc005fb4feb2?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1677709679024-fc005fb4feb2?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1677709679024-fc005fb4feb2?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1677709679024-fc005fb4feb2?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1677709679024-fc005fb4feb2" }, "links": { "self": "https://api.unsplash.com/photos/s0_FCjEFK3E", "html": "https://unsplash.com/photos/s0_FCjEFK3E", "download": "https://unsplash.com/photos/s0_FCjEFK3E/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/s0_FCjEFK3E/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 23, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": {}, "user": { "id": "bXNtnsrlLeY", "updated_at": "2023-03-08T00:48:01Z", "username": "tinorischawy", "name": "Tino Rischawy", "first_name": "Tino", "last_name": "Rischawy", "twitter_username": null, "portfolio_url": "https://www.tinorischawy.com", "bio": "Follow me on Instagram @tino.rischawy \r\n", "location": "Lech am Arlberg, Austria", "links": { "self": "https://api.unsplash.com/users/tinorischawy", "html": "https://unsplash.com/@tinorischawy", "photos": "https://api.unsplash.com/users/tinorischawy/photos", "likes": "https://api.unsplash.com/users/tinorischawy/likes", "portfolio": "https://api.unsplash.com/users/tinorischawy/portfolio", "following": "https://api.unsplash.com/users/tinorischawy/following", "followers": "https://api.unsplash.com/users/tinorischawy/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1677940308779-00ff0d91e929image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1677940308779-00ff0d91e929image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1677940308779-00ff0d91e929image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "tino.rischawy", "total_collections": 2, "total_likes": 0, "total_photos": 82, "accepted_tos": true, "for_hire": true, "social": { "instagram_username": "tino.rischawy", "portfolio_url": "https://www.tinorischawy.com", "twitter_username": null, "paypal_email": null } }, "exif": { "make": "SONY", "model": "ILCE-7M4", "name": "SONY, ILCE-7M4", "exposure_time": "1/1600", "aperture": "9.0", "focal_length": "176.4", "iso": 160 }, "location": { "name": "Sines, Portugal", "city": "Sines", "country": "Portugal", "position": { "latitude": 37.957156, "longitude": -8.860891 } }, "views": 144815, "downloads": 1117 }, { "id": "F_3qZA5DAVU", "created_at": "2023-02-19T12:10:49Z", "updated_at": "2023-03-11T11:40:36Z", "promoted_at": "2023-02-20T13:08:01Z", "width": 4000, "height": 2668, "color": "#262626", "blur_hash": "LA6biIHYo|yC*I8xkCyC.RVsoetR", "description": null, "alt_description": "a woman standing on top of a large rock", "urls": { "raw": "https://images.unsplash.com/photo-1676808625978-400448b79d48?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3", "full": "https://images.unsplash.com/photo-1676808625978-400448b79d48?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80", "regular": "https://images.unsplash.com/photo-1676808625978-400448b79d48?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1676808625978-400448b79d48?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1676808625978-400448b79d48?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200", "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1676808625978-400448b79d48" }, "links": { "self": "https://api.unsplash.com/photos/F_3qZA5DAVU", "html": "https://unsplash.com/photos/F_3qZA5DAVU", "download": "https://unsplash.com/photos/F_3qZA5DAVU/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM", "download_location": "https://api.unsplash.com/photos/F_3qZA5DAVU/download?ixid=MnwzMzUwMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg2MTAzOTM" }, "likes": 54, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "topic_submissions": {}, "user": { "id": "NVQt8tnRPXw", "updated_at": "2023-03-11T18:19:15Z", "username": "ihovsky", "name": "Andrey Stakhovskiy", "first_name": "Andrey", "last_name": "Stakhovskiy", "twitter_username": null, "portfolio_url": "http://instagram.com/ihovsky", "bio": null, "location": "Da Nang, Vietnam", "links": { "self": "https://api.unsplash.com/users/ihovsky", "html": "https://unsplash.com/@ihovsky", "photos": "https://api.unsplash.com/users/ihovsky/photos", "likes": "https://api.unsplash.com/users/ihovsky/likes", "portfolio": "https://api.unsplash.com/users/ihovsky/portfolio", "following": "https://api.unsplash.com/users/ihovsky/following", "followers": "https://api.unsplash.com/users/ihovsky/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-1675013363974-4b4b9ac153bbimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32", "medium": "https://images.unsplash.com/profile-1675013363974-4b4b9ac153bbimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64", "large": "https://images.unsplash.com/profile-1675013363974-4b4b9ac153bbimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128" }, "instagram_username": "ihovsky", "total_collections": 0, "total_likes": 3, "total_photos": 43, "accepted_tos": true, "for_hire": true, "social": { "instagram_username": "ihovsky", "portfolio_url": "http://instagram.com/ihovsky", "twitter_username": null, "paypal_email": null } }, "exif": { "make": null, "model": null, "name": null, "exposure_time": null, "aperture": null, "focal_length": null, "iso": null }, "location": { "name": null, "city": null, "country": null, "position": { "latitude": 0.0, "longitude": 0.0 } }, "views": 362303, "downloads": 1947 }]
  }

  showExifModalHandler = (v) => {
    this.setState({ showExifModalFlag: true, currentOperatingImgData: v })
  }

  showImgInfoHandler = (v) => {
    this.setState({ showImgInfoFlag: true, currentOperatingImgData: v })
  }

  downloadImgHandler = (v) => {
    axios.get(v.links.download_location, {
      headers: {
        Authorization: 'Client-ID k2kHT_o8MmOUmtpjg0xYdjqa6VXbt9ybeTCWPJ9fV9A'
      },
    }).then((res) => {
      let eleLink = document.createElement('a')
      eleLink.href = res.data.url
      eleLink.click()
      eleLink.remove()
    })
  }

  prevHandler = () => {
    this.setState({ imgData: this.state.prevImgData })
  }

  async searchHandler(v) {
    this.setState({ searchSuccess: false })
    await this.getImgDataByAPI()
    this.setState({ searchSuccess: true })
  }

  componentDidMount() {
    //this.getImgDataByAPI()
  }

  async getImgDataByAPI() {
    this.setState({ prevImgData: this.state.imgData, apiSuccess: false })
    const res = await axios.get("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: 'Client-ID k2kHT_o8MmOUmtpjg0xYdjqa6VXbt9ybeTCWPJ9fV9A'
      },
      params: {
        query: this.state.query,
        count: this.state.pageSizeSelected,
        orientation: this.state.orientationSelected
      },
    })
    this.setState({ imgData: res.data, apiSuccess: true })
  }

  render() {
    const currentOperatingImgData = this.state.currentOperatingImgData;
    const currentExif = currentOperatingImgData.exif;
    return (
      <div id='body'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#377DF6',
            },
          }}
        >
          <FloatButton
            onClick={this.prevHandler}
            tooltip={<div>返回上一次</div>}
            icon={<ArrowLeftOutlined />} />
          <Space>
            <Input
              onChange={(e) => this.setState({ query: e.target.value })}
              placeholder='关键字'
              allowClear />
            <Select
              onChange={(v) => this.setState({ pageSizeSelected: v })}
              defaultValue={this.state.pageSizeSelectArray[0]}
              options={this.state.pageSizeSelectArray}
            />
            <Radio.Group
              onChange={(e) => this.setState({ orientationSelected: e.target.value })}
              defaultValue={this.state.orientationSelectArray[0].value}
              buttonStyle="solid">
              {
                this.state.orientationSelectArray.map((v) => {
                  return (
                    <Radio.Button key={v.value} value={v.value}>{v.label}</Radio.Button>
                  )
                })
              }
            </Radio.Group>
            <Button
              icon={<SearchOutlined />}
              type='primary'
              onClick={(v) => this.searchHandler(v)}
              loading={!this.state.searchSuccess} />
          </Space>
          <div id='img-body'>
            <Image.PreviewGroup>
              {
                this.state.imgData.map(v => {
                  return (
                    <div
                      className='img-box-items'
                      key={v.id}>
                      <Image
                        height={300}
                        src={v.urls.small_s3}
                        preview={{
                          src: v.urls.regular,
                          mask:
                            <div style={{ textAlign: 'center' }}>
                              <p>点击预览</p>
                              <p>{v.alt_description}</p>
                            </div>
                        }} />
                      <div
                        className='img-bottom-box-items'>
                        <div
                          className='img-user-info'>
                          <Avatar
                            size={32}
                            src={v.user.profile_image.small} />
                          <span
                            style={{ marginTop: '2px' }}>
                            {v.user.name}
                          </span>
                        </div>
                        <div
                          className='img-operating-space'>
                          <Space
                            size='middle'>
                            <Tooltip
                              title="查看 EXIF 信息">
                              <Button
                                onClick={() => this.showExifModalHandler(v)}
                                icon={<CameraOutlined />} />
                            </Tooltip >
                            <Tooltip
                              title={'下载原图: ' + v.width + '*' + v.height}>
                              <Button
                                onClick={() => this.downloadImgHandler(v)}
                                icon={<DownloadOutlined />} />
                            </Tooltip >
                            <Tooltip
                              title="更多信息">
                              <Button
                                onClick={() => this.showImgInfoHandler(v)}
                                icon={<InfoOutlined />} />
                            </Tooltip >
                          </Space>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </Image.PreviewGroup>
          </div>
          <Modal
            title="EXIF 信息"
            width={700}
            footer={null}
            open={this.state.showExifModalFlag}
            onCancel={() => this.setState({ showExifModalFlag: false })}
            centered>
            <Descriptions
              bordered
              column={3}
              layout="vertical">
              <Descriptions.Item label="创作设备全名" span={3}>{currentExif.name ? currentExif.name : '/'}</Descriptions.Item>
              <Descriptions.Item label="创作设备品牌">{currentExif.make ? currentExif.make : '/'}</Descriptions.Item>
              <Descriptions.Item label="创作设备型号">{currentExif.model ? currentExif.model : '/'}</Descriptions.Item>
              <Descriptions.Item label="曝光时长">{currentExif.exposure_time ? currentExif.exposure_time : '/'}</Descriptions.Item>
              <Descriptions.Item label="光圈">{currentExif.aperture ? currentExif.aperture : '/'}</Descriptions.Item>
              <Descriptions.Item label="焦距">{currentExif.focal_length ? currentExif.focal_length : '/'}</Descriptions.Item>
              <Descriptions.Item label="ISO">{currentExif.iso ? currentExif.iso : '/'}</Descriptions.Item>
            </Descriptions>
          </Modal>
          <Modal
            title="作品信息"
            width={700}
            footer={null}
            open={this.state.showImgInfoFlag}
            onCancel={() => this.setState({ showImgInfoFlag: false })}
            centered>
            <img
              style={{ width: '100%' }}
              src={currentOperatingImgData.urls.regular}
              alt={currentOperatingImgData.alt_description} />
            <Descriptions
              bordered
              column={3}
              layout="vertical">
              <Descriptions.Item
                label="作者">
                <Space
                  size='middle'>
                  <Avatar
                    size={32}
                    src={currentOperatingImgData.user.profile_image.small} />
                  <a
                    href={currentOperatingImgData.user.links.html}>
                    {currentOperatingImgData.user.name}
                  </a>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="作者简介">{currentOperatingImgData.user.bio}</Descriptions.Item>
              <Descriptions.Item label="作者位置">{currentOperatingImgData.user.location ? currentOperatingImgData.user.location : '暂无'}</Descriptions.Item>
              <Descriptions.Item label="作品描述" span={3}>{currentOperatingImgData.alt_description}</Descriptions.Item>
              <Descriptions.Item label="创作时间" span={3}>{currentOperatingImgData.created_at}</Descriptions.Item>
              <Descriptions.Item label="创作地点">{currentOperatingImgData.location.name ? currentOperatingImgData.location.name : '暂无'}</Descriptions.Item>
              <Descriptions.Item label="原始宽度">{currentOperatingImgData.width}</Descriptions.Item>
              <Descriptions.Item label="原始高度">{currentOperatingImgData.height}</Descriptions.Item>
              <Descriptions.Item label="收藏量">{currentOperatingImgData.likes}</Descriptions.Item>
              <Descriptions.Item label="浏览量">{currentOperatingImgData.views}</Descriptions.Item>
              <Descriptions.Item label="下载量">{currentOperatingImgData.downloads}</Descriptions.Item>
              <Descriptions.Item label="创作设备全名" span={3}>{currentExif.name ? currentExif.name : '/'}</Descriptions.Item>
              <Descriptions.Item label="创作设备品牌">{currentExif.make ? currentExif.make : '/'}</Descriptions.Item>
              <Descriptions.Item label="创作设备型号">{currentExif.model ? currentExif.model : '/'}</Descriptions.Item>
              <Descriptions.Item label="曝光时长">{currentExif.exposure_time ? currentExif.exposure_time : '/'}</Descriptions.Item>
              <Descriptions.Item label="光圈">{currentExif.aperture ? currentExif.aperture : '/'}</Descriptions.Item>
              <Descriptions.Item label="焦距">{currentExif.focal_length ? currentExif.focal_length : '/'}</Descriptions.Item>
              <Descriptions.Item label="ISO">{currentExif.iso ? currentExif.iso : '/'}</Descriptions.Item>
            </Descriptions>
          </Modal>
          <div id='declaration-box'>
            图片资源来源于<a href='https://unsplash.com/'>Unsplash</a>
          </div>
        </ConfigProvider>
      </div>
    );
  }
}
