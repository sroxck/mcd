<template>
  <div class="app-container">
    <el-button style="width:100%" @click="this.dialogFormVisible = true">新增配件</el-button>
    <el-dialog title="新增配件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="配件名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
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
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList:[],
      listLoading:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
    };
  },
  created(){
    this.getList()
  },
  methods:{
    addItem(){
      this.dialogFormVisible = false
      this.http.addPeijian(this.form).then(res=>{
        console.log(res,'22');
        if(res.code == 200)  {
          this.getList()
          this.$notify.success('新增成功')
        } else{
          this.$notify.success('新增失败,请联系管理员')
        }

      })
    },
    getList(){
      this.listLoading=true
       this.http.QueryPeijian({}).then(res=>{
        this.tableList = res.data
      this.listLoading=false

      })
    }
  }
};
</script>