// eslint-disable-next-line import/no-anonymous-default-export
export default {
  multipass: true, // Chạy nhiều vòng tối ưu
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // cleanupIds: false, // Bật nếu muốn giữ nguyên id SVG
        },
      },
    },
    // Thêm plugin nếu muốn
    // 'prefixIds',
    // {
    //   name: 'removeAttrs',
    //   params: { attrs: '(data-name|fill)' },
    // },
  ],
};
