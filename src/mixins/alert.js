
export default {
    methods: {
        mAlert(content, okClose, type, title, width, duration) {
            let config = {
                title: !!title ? title : "提示消息",
                content: content,
                width: !!width?width:400,
                closable: false,
                scrollable: false,
                onOk: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                }
            };
            switch (type) {
                case 'success':
                    this.$Modal.success(config);
                    break;
                case 'warning':
                    this.$Modal.warning(config);
                    break;
                case 'error':
                    this.$Modal.error(config);
                    break;
                default:
                    this.$Modal.info(config);
                    break;
            }
            duration = !!duration ? duration * 1000 : 0;
            if (duration > 0) {
                setTimeout(() => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                    this.$Modal.remove();
                }, duration);
            }
        },
        mConfirm(content,okClose,cancel){
            this.$Modal.confirm({
                title: '请确认',
                content: content,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                },
                onCancel: () => {
                    if (typeof cancel == 'function') {
                        cancel();
                    }
                }
            });
        },
    }
}