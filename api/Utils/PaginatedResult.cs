namespace api.Utils;

public class PaginatedResult<T>
{
    public List<T> Data { set; get; } = [];
    public int Total { set; get; }
    public int Skip { get; set; }
    public int Take { get; set; }
}