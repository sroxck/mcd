<template>
  <div class="app-container">
    <!-- 查询表单 绑定 query字段-->
    <el-row style="margin-bottom:20px">
      <el-input
        placeholder="请输入配件名称,按回车查询"
        size="small"
        prefix-icon="el-icon-search"
        v-model="query"
        @change="queryTable"
        style="width:280px;"
      ></el-input>
      <el-button @click="dialogFormVisible = true" size="small" style="margin-left:10px;">新增配件</el-button>
      <el-button style @click="getList()" size="small">重置</el-button>
    </el-row>
    <!-- 新增的弹框 绑定 form对象-->
    <el-dialog title="新增配件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-button @click="form.data.push({})">新增一行</el-button>
        <el-row v-for="(item,index) in form.data" :key="index">
          <el-form-item label="配件名称" :label-width="formLabelWidth">
            <el-input v-model="item.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配件数量" :label-width="formLabelWidth">
            <el-input v-model="item.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配件厂商" :label-width="formLabelWidth">
            <el-input v-model="item.vendor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配件进价" :label-width="formLabelWidth">
            <el-input v-model="item.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配件单价" :label-width="formLabelWidth">
            <el-input v-model="item.oneprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="产品编号" :label-width="formLabelWidth">
            <el-input v-model="item.prnum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分组" :label-width="formLabelWidth">
            <el-input v-model="item.grop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="item.bz" autocomplete="off"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示的表格 绑定 tableList数组-->
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      size="small"
      border
      fit
      stripe
    >
      <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
      <el-table-column label="配件名称" prop="name"></el-table-column>
      <!-- <el-table-column label="配件数量" prop="num"></el-table-column> -->
      <el-table-column label="配件厂商" prop="vendor"></el-table-column>
      <el-table-column label="配件编号" prop="prnum"></el-table-column>
      <el-table-column label="配件进价" prop="price"></el-table-column>
      <el-table-column label="配件单价" prop="oneprice"></el-table-column>
      <el-table-column label="备注" prop="bz"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的抽屉 绑定 modifyData对象-->
    <el-dialog
      title="编辑配件信息"
      :visible.sync="drawer"
      :before-close="handleClose"
      class="tk"
    >
      <el-form :model="modifyData" :inline="true" label-position="left" >
        <el-form-item label="配件名称" label-width="100px">
          <el-input v-model="modifyData.name" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" label-width="100px">
          <el-input v-model="modifyData.num" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件厂商" label-width="100px">
          <el-input v-model="modifyData.vendor" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件编号" label-width="100px">
          <el-input v-model="modifyData.prnum" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件进价" label-width="100px">
          <el-input v-model="modifyData.price" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件单价" label-width="100px">
          <el-input v-model="modifyData.oneprice" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="分组" label-width="100px">
          <el-input v-model="modifyData.grop" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input v-model="modifyData.bz" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="editData">确 定</el-button>
        <el-button @click="drawer = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 分页组件 -->
    <pagination
      v-show="form.totalRow>0"
      :total="form.totalRow"
      :page.sync="form.pageNumber"
      :limit.sync="form.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // 分页

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      grop: {
        data: [{}],
      },
      query: "", // 查询输入框绑定的字段
      tableList: [], // 表格绑定的数组
      listLoading: false, // 表格 loading 字段
      dialogFormVisible: false,  // 控制新增弹框打开
      drawer: false, // 控制修改抽屉打开
      form: { // 新增绑定的对象
        data: [{}], // 用于新增一组数据
        pageNumber: 1, // 分页查询需要的字段
        pageSize: 20, // 分页查询需要的字段
        totalRow: 0, // 分页查询需要的字段
      },
      modifyData: { // 修改抽屉绑定的对象
        name: "",
        num: "",
        id: "",
        oneprice: "",
        price: "",
        prnum: "",
        vendor: "",
        grop: "",
        bz: "",
      },
      formLabelWidth: "120px", // 表单 label 绑定的宽度
    };
  },
  created() {
    this.getList();
  },
  methods: {
    queryTable() {
      console.log(this.query);
      this.http.QueryPeijian({ query: this.query }).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
    handleClose() {
      this.$confirm("确定要关闭吗？")
        .then((_) => {
          this.drawer = false;
        })
        .catch((_) => {
          this.drawer = true;
        });
    },
    remove(id) {
      this.$confirm("此操作将永久删除该配件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.removePeiJian({ id }).then((res) => {
            if (res.code == 200) {
              this.$notify.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$notify({
            duration: 2000,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editData() {
      this.http.modifyPeiJian(this.modifyData).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("修改成功");
          this.drawer = false;
        }
      });
    },
    edit(row) {
      console.log(row);
      this.drawer = true;
      this.modifyData.name = row.name;
      this.modifyData.num = row.num;
      this.modifyData.id = row._id;
      this.modifyData.grop = row.grop;
      this.modifyData.bz = row.bz;
      this.modifyData.prnum = row.prnum;
      this.modifyData.price = row.price;
      this.modifyData.oneprice = row.oneprice;
      this.modifyData.vendor = row.vendor;
    },
    addItem() {
      this.dialogFormVisible = false;
      this.http.addPeijian(this.form).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("新增成功");
          this.form.data = [{}];
        } else {
          this.$notify.success("新增失败,请联系管理员");
        }
      });
    },
    getList() {
      this.listLoading = true;
      let info = {
        pageNumber: this.form.pageNumber,
        pageSize: this.form.pageSize,
      };
      this.http.QueryPeijian(info).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
    },
  },
};
</script>
<style lang="scss">
.close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>