import React, { Component } from 'react'
import './App.css';
import { Skeleton, Input, Image, Space, Select, FloatButton, Avatar, Button, Modal, Tooltip, Descriptions, Radio, ConfigProvider } from 'antd';
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
    imgData: []
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
    this.getImgDataByAPI()
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
              colorPrimary: '#2B2B2B',
            },
          }}
        >
          <FloatButton
            onClick={this.prevHandler}
            tooltip={<div>返回上一次</div>}
            icon={<ArrowLeftOutlined />} />
          <Space>
            <a href="https://about.zyan1226.cn">
              <Avatar size='large' src="https://s2.loli.net/2023/03/12/mqKM6js5oteDH1N.png" shape='square' />
            </a>
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
          <Skeleton
            style={{ marginTop: '20px' }}
            active={true}
            loading={!this.state.apiSuccess}>
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
            <div id='declaration-box'>
              图片资源来源于<a href='https://unsplash.com/'>Unsplash</a>
            </div>
          </Skeleton>
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
        </ConfigProvider>
      </div >
    );
  }
}
