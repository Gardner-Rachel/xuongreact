import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, message, FormProps, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

type FieldType = {
  name: string;
};

const CategoryAddPage = () => {
  const [ messageApi, contextHolder ] = message.useMessage();
  const [form] = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (category: FieldType) => {
      try {
        return await instance.post(`/categories`, category)
      } catch (error) {
        throw new Error("Thêm danh mục thất bại");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm danh mục thành công",
      });
      form.resetFields();
    },
    onError: (error) => {
      messageApi.open({
        type: "success",
        content: error.message,
      });
    }
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
};


  return (
    <div>
      {contextHolder}
    <div className='flex items-center justify-between mb-5 '>
        <h1 className='text-2xl font-semibold'>Thêm danh mục</h1>
        <Button type='primary'>
            <Link to={`/admin/categories`} >
                <BackwardFilled /> Quay lại
            </Link>
        </Button>
    </div>  
    <div className='max-w-4xl mx-auto'>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete='off'
        >
            <Form.Item<FieldType>
                label="Tên danh mục"
                name="name"
                rules={[{ required: true, message: 'Tên danh mục bắt buộc phải có!' }]}
            >
                <Input disabled={isPending} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loading3QuartersOutlined className='animate-spin mr-2' />
                            Submit
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Form.Item>
        </Form>

    </div>
</div>
  )
}

export default CategoryAddPage;