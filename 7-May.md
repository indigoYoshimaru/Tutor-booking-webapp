---


---

<h1 id="summary-552021">Summary 7/5/2021</h1>
<h1 id="back-end">1. Back end:</h1>
<p>Các function mình sẽ phải code tuần này sẽ liên quan đến việc quản lý user, user contact và 1 phần create contract, bao gồm:</p>

<table>
<thead>
<tr>
<th>Function</th>
<th>Controller/File</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>addNewAdmin</code></td>
<td>Admin</td>
</tr>
<tr>
<td><code>banTutor</code></td>
<td>Admin</td>
</tr>
<tr>
<td><code>banTutee</code></td>
<td>Admin</td>
</tr>
<tr>
<td><code>createContract</code></td>
<td>Tutee</td>
</tr>
<tr>
<td><code>makeTransaction</code></td>
<td>utility</td>
</tr>
<tr>
<td><code>contactTutor</code></td>
<td>Tutee</td>
</tr>
<tr>
<td><code>chat</code></td>
<td>Both tutor and tutee</td>
</tr>
</tbody>
</table><p>Tuần này thì Khoa sẽ viết những function: <code>addNewAdmin</code>,<code>banTutor</code>, <code>banTutee</code>, <code>createContract</code>.<br>
T sẽ viết những function còn lại, bao gồm:  <code>makeTransaction</code>,<code>contactTutor</code> và<code>chat</code><br>
Bên cạnh đó mình cần chỉnh sửa 1 vài phần như sau:</p>
<ul>
<li>Thêm Email cho admin vào database. Email này sẽ cần dùng trong add new admin function. (đã update)</li>
<li>Khi verify registration, cần check thêm email của ng đăng ký có trùng vs những email của UnverifiedTutor hay không.</li>
<li>Update secret key.</li>
<li>Kiểm tra hàm login</li>
</ul>
<h2 id="add-new-admin">Add new admin:</h2>
<p>Vì admin sẽ phải register offline, và chỉ có admin mới được thêm admin vào hệ thống, ở front end, admin sẽ nhập vào thông tin của người cần thêm vô. Mặc dù vậy, hàm này có tính chất khá giống register Tutee.<br>
Mình sẽ viết hàm addNewAdmin như sau:</p>
<ol>
<li>Nhận tất cả thông tin của admin từ request</li>
<li>Validate username của admin này</li>
<li>Hash password của admin mới, và tạo token cho object admin(tham khảo TuteeController)</li>
<li>Gửi mail cho admin mới (tham khảo TuteeController)</li>
<li>Verify để add vào database (tham khảo TuteeController)</li>
</ol>
<h2 id="ban-tutor-and-ban-tutee-functions">Ban tutor and ban tutee functions:</h2>
<p>Hai hàm này sẽ đơn giản là xóa tutor và tutee ra khỏi hệ thống. Nhưng khi xóa tutor và tutee mình phải xóa luôn cả những bảng có xử dụng 2 đứa này làm key ha.</p>
<h2 id="create-contract">Create contract:</h2>
<p>Mình quy định yêu cầu nghiệp vụ sẽ như sau:</p>
<ul>
<li>Nếu cùng 1 bộ tutor, tutee nhưng có contract chưa close, mình sẽ không tạo contract mới. Điều này có thể giải thích như giúp đảm bảo việc dạy và học của tutor và tutee đạt kết quả tối ưu.</li>
<li>list of teaching days phải gồm những ngày nằm trong khoảng StartDate và CloseDate của contract</li>
<li>teaching hours sẽ bao gồm tổng thời gian dạy của tutor</li>
<li>số tiền cho transaction=teaching hours*base (assume base là 50000)
<ul>
<li>khi này Khoa chỉ cần gọi hàm <code>makeTransaction(from,to,amount)</code></li>
</ul>
</li>
</ul>
<p>Từ đây Khoa có thể xử lý thành logic rồi ha. Hàm sẽ trả về tất cả thông tin của contract và thêm transaction amount nữa ha</p>
<hr>
<p>Vậy là kết thúc backend, mình sẽ chuyển qua front end.</p>
<h1 id="front-end">2. Front end:</h1>
<p>Như t nói là mình sẽ chuyển sang framework mới, thì cái này sẽ là <a href="https://framework7.io/vue">https://framework7.io/vue</a> nhớ là có cái /vue nha :D. Thì như mn thấy, nó dùng component làm tag luôn, chứ ko dùng html thuần nữa nữa.<br>
Thì đây là cấu trúc file của mình.<br>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/71CkFm2/image.png" alt="image" border="0"></a></p>
<p>Mình sẽ viết UI component và UI script vào file dưới dạng vue, và bỏ nó vào thư mục components. Bên file index, mình sẽ định dạng route cho các trang này.</p>
<p>Để install, mn làm các bước sau đây:</p>
<ol>
<li>
<p>install vite global</p>
<pre><code>npm i -g vite
</code></pre>
</li>
<li>
<p>Cài đặt các package cần thiết</p>
<p>Vào folder project, ở đây là front_end và dùng lệnh<br>
<code>npm i</code></p>
</li>
<li>
<p>Kích hoạt <code>vite</code></p>
<p>Để bắt đầu chạy <code>vite</code>, tại thư mục project dùng lệnh</p>
<pre><code>vite
</code></pre>
</li>
</ol>

