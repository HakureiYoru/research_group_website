# 学术成果数据流水线（OpenAlex + Semantic Scholar）

本指南用于在 CI/CD 或本地刷新学术成果数据。

## 更新内容
- 构建期 Python 抓取器 `fetcher.py` 以 OpenAlex 为主、Semantic Scholar 为辅聚合数据，合并手动补充，写入 `data/publications.json`。
- Next.js 页面在构建时消费 `data/publications.json`（SSG），本地高亮课题组成员，完全去谷歌化。

## 前置条件
- Python 3.10+，执行 `pip install -r requirements-fetcher.txt`（或 `pip install "requests>=2.31" "tenacity>=8.2" "PyYAML>=6.0"`）。
- 能访问 `api.openalex.org` 与 `api.semanticscholar.org`。

## 配置数据源
1) **OpenAlex 链接清单（可仅依赖此项）**：编辑 `data/openalex_queries.json`，写入一组 OpenAlex API 链接（数组）。
   ```json
   [
     "https://api.openalex.org/works?page=1&filter=authorships.author.id:a5090159617,authorships.institutions.lineage:i69356397&sort=cited_by_count:desc&per_page=10&mailto=ui@openalex.org"
   ]
   ```
   - 支持多个链接；脚本会自动改用 cursor 翻页、`per_page=200`、`sort=cited_by_count:desc`，并覆盖 `mailto` 为 `OPENALEX_MAILTO`（默认 `lab@edu.cn`），因此链接只需写一份即可。
   - 如果只想依赖链接，保持 `members.json` 为空也可以。
2) **成员锚定文件（可选增强、高亮课题组成员）**：编辑 `data/members.json`。
   ```json
   [
     {
       "name": "Full Name",
       "orcid": "0000-0000-0000-0000",
       "openalex_id": "https://openalex.org/A123456789",
       "institution_id": "https://openalex.org/I123456789",
       "aliases": ["Name, F.", "F. Name"]
     }
   ]
   ```
   - 锚定优先级：ORCID → OpenAlex 作者 ID → 机构 ID + 姓名过滤。
   - 字段说明：`name` 必填；`aliases` 用于不同写法（含缩写）；`institution_id` 用于机构+姓名联合过滤（OpenAlex 机构 URL）；`openalex_id` 为作者 URL（例如 `https://openalex.org/A123...`）；`orcid` 建议填真实 ORCID。
   - 小技巧：至少为每位成员填 ORCID 或 OpenAlex ID，可显著提高匹配准确率；别名保持“姓, 名缩写”与“名 姓”两种常见格式。
   - 若使用链接清单，成员文件主要用于标记 `isGroupMember`（高亮作者），不是必填。
2) **手动补充**：在 `data/manual_pubs.yaml` 中新增或覆盖条目。
   ```yaml
   - id: your-custom-id           # 可选；不写则用 DOI/OpenAlex ID
     title: "Paper title"
     year: 2024
     venue: "Journal / Conference"
     doi: 10.xxxx/xxxx
     pdf_url: https://...
     code_url: https://github.com/...
     tldr: "一句话摘要"
     citation_count: 12
     authors:
       - name: Alice Zhang
         is_group_member: true
       - name: Bob Smith
     notes: "备注/补充来源"
   ```
   - 适用场景：API 未收录的成果、需要覆盖 TLDR/引用数/链接，或添加代码链接等。
   - 如需强制标记课题组成员，请在 `authors[*].is_group_member` 填写 `true`。

## 运行抓取脚本
- 本地：`npm run fetch:publications`（或 `python fetcher.py`）。
- 可选环境变量：
  - `OPENALEX_MAILTO`（默认 `lab@edu.cn`）进入 Polite Pool。
  - `SEMANTIC_SCHOLAR_API_KEY`（如有）。
  - `MEMBERS_FILE` / `MANUAL_PUBS_FILE` 自定义路径，或 `MEMBERS_JSON` 直接传入 JSON。
  - `UNPAYWALL_EMAIL`（默认同 `OPENALEX_MAILTO`）：用于 Unpaywall DOI 获取 OA PDF 链接。
- 输出：`data/publications.json`（覆盖占位文件）。

### 配置完成后的自检
- 确认 `data/members.json`、`data/manual_pubs.yaml` 均为合法 JSON/YAML（若报错，运行 `python fetcher.py` 会给出行号）。
- 运行 `npm run fetch:publications` 后，检查 `data/publications.json` 中是否包含最新年份、成员高亮信息（`isGroupMember`）。
- 如需重复拉取，直接重新运行脚本即可，文件会被覆盖。

## CI/CD 钩子
- 在 `next build` 前增加步骤：
  ```bash
  python fetcher.py
  npm run build
  ```
- API Key 仅留在服务端环境变量；数据在构建期生成，不经客户端请求。

## 前端表现
- 页面按年份分组展示，支持 OA PDF、引用数（Semantic Scholar）、TLDR、代码链接等。
- 课题组成员根据 `authors[*].is_group_member` 高亮。
- PDF 获取策略：优先 OpenAlex `best_oa_location`，无则尝试 Unpaywall（需 DOI）。
- 字体与资产本地托管于 `public/fonts/`，无 Google/CDN 依赖。
