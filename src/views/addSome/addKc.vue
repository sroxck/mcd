<template>
  <div class="app-container">
    <el-button style="width:100%" @click="dialogFormVisible = true">新增配件</el-button>
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="配件名称" prop="name"></el-table-column>
      <el-table-column label="配件数量" prop="num"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="编辑配件信息" :visible.sync="drawer" :with-header="false" class="tk">
      <el-form :model="dataop" style="margin-top:50px;">
        <el-form-item label="配件名称" label-width="100px">
          <el-input v-model="dataop.name" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" label-width="100px">
          <el-input v-model="dataop.num" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer close">
        <el-button @click="editData">确 定</el-button>
        <el-button @click="drawer = false">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [],
      listLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      drawer: false,
      form: {
        data: [{}],
      },
      dataop: {
        name: "",
        num: "",
        id: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    remove(id) {
      this.http.removePeiJian({ id }).then((res) => {
        if (res.code == 200) {
          this.$notify.success("删除成功");
          this.getList();
        }
      });
    },
    editData() {
      this.http.modifyPeiJian(this.dataop).then((res) => {
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
      this.dataop.name = row.name;
      this.dataop.num = row.num;
      this.dataop.id = row._id;
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
      this.http.QueryPeijian({}).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.close {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>