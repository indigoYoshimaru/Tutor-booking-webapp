---


---

<h1 id="summary-1952021">Summary 19/5/2021</h1>
<p>Xin lỗi mọi người vì sự chậm trễ này, tuần này ráng chạy nhé :))</p>
<h1 id="back-end">1. Back end:</h1>
<p>Tuần này thì mình sẽ implement phần còn lại của create contract, close contract và conflict handling.</p>

<table>
<thead>
<tr>
<th>Function</th>
<th>Controller/File</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>acceptContract</code></td>
<td>Tutor</td>
</tr>
<tr>
<td><code>rejectContract</code></td>
<td>Tutor</td>
</tr>
<tr>
<td><code>requestCloseContract</code></td>
<td>Tutor</td>
</tr>
<tr>
<td><code>requestCloseContract</code></td>
<td>Tutee</td>
</tr>
<tr>
<td><code>raiseConflict</code></td>
<td>Tutee</td>
</tr>
<tr>
<td><code>createConflictResolution</code></td>
<td>Admin</td>
</tr>
<tr>
<td><code>confirmConflictResolution</code></td>
<td>Tutor</td>
</tr>
<tr>
<td><code>confirmConflictResolution</code></td>
<td>Tutee</td>
</tr>
<tr>
<td><code>checkOpenExpiration</code></td>
<td>Contract</td>
</tr>
<tr>
<td><code>checkCloseExpiration</code></td>
<td>Contract</td>
</tr>
</tbody>
</table><p>hừm… cũng hơi nhiều ấy…<br>
Để thuận tiện thì Khoa sẽ viết giúp t những hàm không phụ thuộc kiểm tra thời gian, bao gồm <code>acceptContract</code>, <code>rejectContract</code>, <code>raiseConflict</code>,  và 2 hàm <code>confirmConflictResolution</code></p>
<p>T sẽ viết những hàm còn lại. bên cạnh đó thì nhờ Khoa cứ liên tục test giúp t những function vừa được implement</p>
<h2 id="accept-contract">Accept Contract:</h2>
<p>Tưởng tượng ở front end, tutor sẽ có 1 list các contract, và tutor sẽ click vào 1 trong số đó để thực hiện accept hay reject. Vậy thì  lúc này  mình chỉ cần lấy contractId từ request, và query cái contract này ra để kiểm tra nó có valid không. Nếu valid thì update state của nó thành OPEN<br>
Bây giờ mình đã có hàm makeTransaction rồi đúng không, mình sẽ chuyển cái makeTransaction ở TuteeController sang acceptContract của TutorController. Tức là Tutor đồng thuận rồi mình mới tạo transaction và trừ tiền của tutee</p>
<h2 id="reject-contract">Reject Contract:</h2>
<p>Tương tự như accept contract, khi tutor reject contract, mình sẽ kiểm tra validity của contract đó, và update state của nó thành REJECTED</p>
<h2 id="raise-conflict">Raise Conflict:</h2>
<p>Trước khi làm phần này thì update Type của nó thành isOpen nha.<br>
Để raise 1 conflict, mình sẽ làm tuần tự như sau:</p>
<ul>
<li>Nhận từ request contractId và content</li>
<li>Kiểm tra validity của contractId</li>
<li>Kiểm tra content có empty ko</li>
<li>Lấy Admin ít xử lý conflict nhất bằng hàm getLeastResolveAdmins()</li>
<li>Add vào db vs isOpen = false, 2 tuần kể từ ngày kết thúc tutoring mình mới update trạng thái nó thành true (cái này t làm), TutorAgreement, TuteeAgreement là false và ReturnPercentage là null.</li>
</ul>
<h2 id="confirm-conflict-resolution">Confirm Conflict Resolution:</h2>
<ul>
<li>Confirm của tutor thì update tutorAgreement thành true</li>
<li>Còn của tutee thì update tuteeAgreement thành true</li>
</ul>
<hr>
<p>Sau đó tạo 1 cái conflict controller, cái controller này sẽ quản lý timeline của conflict<br>
Viết 1 hàm close conflict:</p>
<ul>
<li>Kiểm tra nếu cả tutor và tutee đều đã agree chưa.
<ul>
<li>nếu rồi thì sẽ close conflict -&gt; set isOpen thành false</li>
<li>thực hiện chuyển tiền cho tutor theo % trong return amount
<ul>
<li>số tiền trả tutor = số tiền trong contract*(1-returnpercentage)</li>
</ul>
</li>
<li>và cuối cùng là close contract -&gt; set state thành CLOSED</li>
</ul>
</li>
</ul>

