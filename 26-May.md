---


---

<h1 id="summary-2652021">Summary 26/5/2021</h1>
<p>Hiện tại là t đã test gần xong những cái functions rồi. có 1 vài cái cần test tiếp hoặc debug thôi. Đây là bản update hôm nay nha. Tối nay t có việc nên mai chắc sẽ test tiếp cho xong luôn ha.</p>

<table>
<thead>
<tr>
<th>tutor</th>
<th>tutee</th>
<th>admin</th>
<th>contract</th>
<th>issue</th>
</tr>
</thead>
<tbody>
<tr>
<td>register(done)</td>
<td>register(done)</td>
<td>addNewAdmin(done)</td>
<td>updateContractCloseExpiration</td>
<td>updateIssueOpenExpiration</td>
</tr>
<tr>
<td>verify(done)</td>
<td>verify(done)</td>
<td>verify(done)</td>
<td></td>
<td>closeIssue</td>
</tr>
<tr>
<td>login(done)</td>
<td>login(done)</td>
<td>login(done)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>acceptContract  (done)</td>
<td>contactTutor (done)</td>
<td>banVerifiedTutor(done)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>rejectContract(done)</td>
<td>createContract (done)</td>
<td>banTutee(done)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>requestCloseContract(done)</td>
<td>requestCloseContract(error)</td>
<td>verifyTutorRegistration(done)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>raiseIssue (done)</td>
<td>raiseIssue (done)</td>
<td>createIssueResolution(done)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>confirmIssueResolution(done)</td>
<td>confirmIssueResolution(done)</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table><hr>
<p>Workload của tuần này, từ 26/5 đến 30/5 bao gồm:</p>
<ul>
<li>Viết documentation cho chap 2 và 1 phần chap 4</li>
<li>Test lại back end, chỉnh sửa nếu xuất hiện lỗi.</li>
<li>Connect backend, frontend và hoàn thành front end càng nhiều càng tốt. Tập trung những phần trọng tâm của front end trước.</li>
</ul>
<h2 id="about-documentation">About documentation:</h2>
<p>Hiện tại thì Khoa bắt đầu viết được rồi ông ha, mình sẽ viết chap 2, và báo cáo những function ông đã làm của vào chap 4. Tạo 1 file Latex nha ông (lấy template cũ của tụi mình), viết tới đâu cite và làm reference tới đó nha)<br>
<strong>Chap 2</strong>:</p>
<ul>
<li>Similar Applications/Systems: đọc paper nhiều vô ông :)) review tầm 3-5 cái system tương tự mình nhé</li>
<li>Platform and Tools Review: mình dùng những framework/tool gì, vài dòng giới thiệu cho từng loại tool/framework, và tại sao lại dùng nó.
<ul>
<li>AdonisJS (framework cho backend)</li>
<li>VueJS: front end framework</li>
<li><a href="https://vitejs.dev/guide/why.html#slow-server-start">Vite</a> (tool cho front end)</li>
<li>Framework 7(UI framework build trên Vite)</li>
</ul>
</li>
<li>Language and system requirement:
<ul>
<li>Lang: JS, HTML,CSS, SQL</li>
<li>System requirements: nếu chạy offline thì cần install những gì. Document về installation sẽ nằm ở Appendix</li>
</ul>
</li>
</ul>
<p><strong>Chap 4</strong>:<br>
Ở chap này thì ông cần viết:<br>
I. Database Implementation</p>
<ul>
<li>Database implement như thế nào, ông có phải làm thêm những chi tiết nào để thỏa mãn 1 vài requirements (vd khi xóa tutor thì có j mình cần xóa, có gì không cần)</li>
<li>List SQL ở trong Update service và query service. Trong số này có gì mình cần chú ý không</li>
</ul>
<p>II. Back-end:</p>
<ul>
<li>Ông đã code những hàm nào, chức năng của từng hàm, và đặc điểm cần lưu ý<br>
(t sẽ bổ sung sau cho phần này). giờ thì để xong front end đã :))</li>
</ul>
<p><strong>DEADLINE: 30/5</strong></p>
<h2 id="về-phần-test">Về phần test:</h2>
<p>Vi thực hiện test phụ tụi t nha. Mặc dù là đó giờ Khoa cũng có chụp hình lại để làm cái test document. Vi cài DB lại, và sau đó chạy adonis như bthg, test trên RESTer (import file rester trên github vào)<br>
Phần này thì chạy route bình thường thì được, nhưng phần logic chưa kiểm tra hết. Vì vậy cần Vi đọc lại và suy nghĩ với logic này thì mình test nó ntn. Đồng thời cũng suy nghĩ là với workflow như vầy, thì Vi cần phải thiết kế và chỉnh sửa front end ntn. Dù hồi trước t có nói, nhưng do chưa có backend, t thấy Vi vẫn chưa nắm hệ thống mình hết.<br>
Hết 27/5 Vi làm 1 cái note nhè nhẹ về workflow của mình ntn cho t xem coi ổn không nhé.<br>
Sau đó thì quay qua phụ t<br>
<strong>DEADLINE: 27/5</strong></p>
<h2 id="phần-linh">Phần Linh:</h2>
<p>T sẽ hoàn tất chỉnh sửa backend và kết nối front end trong ngày mai, sau đó thì t và Vi bắt tay vào đẩy nhanh tiến độ frontend nha, hoàn thành phần thô trước  3/6. Sau đó Vi có “làm đẹp” cho nó thì làm ha :))<br>
<strong>DEADLINE: 27/5</strong><br>
<strong>DEADLINE FINISH FRONT END : 3/6</strong></p>
<h2 id="report-template">Report template</h2>
<p>(just in case blackboard crashes)<br>
Template sẽ có thể được chỉnh sửa</p>
<ul>
<li><strong>CHAPTER I : INTRODUCTION</strong>
<ul>
<li>Motivation  - Khoa</li>
<li>Problems Statement - Linh</li>
<li>Scope - Linh</li>
</ul>
</li>
<li><strong>CHAPTER II: LITERATURE REVIEW</strong> Khoa
<ul>
<li>Similar Applications/Systems</li>
<li>Platform and Tools Review</li>
</ul>
</li>
<li><strong>CHAPTER III: SYSTEM DESIGN</strong> (Linh)
<ul>
<li>System Requirement Specification
<ul>
<li>Funtional Requirements</li>
<li>Requirements Analysis</li>
<li>Non-functional Requirements</li>
</ul>
</li>
<li>System Design Specification
<ul>
<li>Use-cases Diagram (summary goal use case and at least 3 main use cases)</li>
<li>Sequence Diagram (at least 3 main sequence)</li>
<li>Activity Diagram (at least 3 main activities)</li>
<li>Relational Model Diagram</li>
</ul>
</li>
</ul>
</li>
<li><strong>CHAPTER IV: SYSTEM IMPLEMENTATION</strong>
<ul>
<li>Database (Khoa)
<ul>
<li>Database creation and queries</li>
<li>Database conectivity</li>
</ul>
</li>
<li>Web application implementation
<ul>
<li>Back-end (Khoa and Linh)</li>
<li>Front-end (Vi and Linh)</li>
</ul>
</li>
</ul>
</li>
<li><strong>CHAPTER V: CONCLUSION AND DISCUSSION</strong> (Vi)
<ul>
<li>List of accomplished work</li>
<li>Strength and Weakness</li>
<li>Future Work</li>
</ul>
</li>
<li>References</li>
</ul>

