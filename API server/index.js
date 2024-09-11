const router = require("./router/index");
const createServer = require("http").createServer;

const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://binh:0332826845Binh@cluster0.on5bx.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0';

// Remove deprecated options from the MongoClient constructor
const client = new MongoClient(url);

async function main() {
  try {
    // Kết nối tới MongoDB
    await client.connect();
    console.log("Kết nối thành công đến MongoDB!");

    // Lấy ra cơ sở dữ liệu
    const db = client.db('sample_mflix'); // Replace <dbname> with your desired database name

    // Thực hiện các thao tác với cơ sở dữ liệu tại đây

  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB:", error);
  } finally {
    // Ensure the client is closed when it's no longer needed
    await client.close();
  }
}


async function fetchMovies() {
  try {
    // Kết nối tới MongoDB
    await client.connect();
    console.log("Kết nối thành công đến MongoDB!");

    // Lấy ra cơ sở dữ liệu và collection
    const db = client.db('sample_mflix');
    const moviesCollection = db.collection('movies');

    // Truy vấn toàn bộ dữ liệu từ collection 'movie'
    const movies = await moviesCollection.find({}).toArray();
    console.log("Movies:", movies);

  } catch (error) {
    console.error("Lỗi kết nối hoặc truy vấn đến MongoDB:", error);
  } finally {
    // Đảm bảo đóng client khi không cần thiết
    await client.close();
  }
}

// Gọi hàm để lấy dữ liệu
fetchMovies().catch(console.error);

// Call the main function
// main().catch(console.error);

const server = createServer((req, res) => {
  router.run(req, res);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
