// Five six-second phrases per chapter. 120 BPM, 12 beats per phrase.
module.exports = [
 ['ORIGIN','秩序之形','THE SHAPE OF ORDER','#74eaff',[
 ['世界，起初是一片数据。','In the beginning, the world is data.'],
 ['每一次点击，每一束光，每一个念头。','Every click. Every photon. Every idea.'],
 ['数量不是力量。组织，才是。','Volume is not power. Organization is.'],
 ['让关系显形，让计算发生。','Make relationships visible. Make computation possible.'],
 ['数据结构：数字世界的隐形建筑。','Data structures: the invisible architecture of our world.']]],
 ['01 / ARRAY','以位置，抵达','A PLACE FOR EVERYTHING','#67ddff',[
 ['数组，让元素拥有连续的位置。','An array gives elements contiguous positions.'],
 ['基址加上偏移，直接抵达目标。','Base address plus offset. Arrive directly.'],
 ['按索引访问：O(1)。','Indexed access: O(1).'],
 ['中间插入，通常需要移动后续元素。','Insertion in the middle usually shifts later elements.'],
 ['紧凑与局部性，让遍历更接近硬件的节奏。','Compact layout and locality bring traversal closer to hardware.']]],
 ['02 / LINKED LIST','以连接，延伸','FOLLOW THE CONNECTION','#aa8bff',[
 ['链表，不要求相邻的内存。','A linked list does not require adjacent memory.'],
 ['每个节点，都保存通往下一个节点的线索。','Each node carries a reference to the next.'],
 ['已知插入位置，改写连接即可插入。','With the insertion position known, rewire the links.'],
 ['但寻找第 k 个节点，需要逐个前行。','Finding the kth node means following links one by one.'],
 ['灵活连接的代价：指针空间与访问局部性。','Flexibility costs pointer space and memory locality.']]],
 ['03 / STACK','记住，来时的路','THE ART OF RETURNING','#ff8abb',[
 ['栈，把最近发生的事留在顶端。','A stack keeps the most recent item on top.'],
 ['后进先出：LIFO。','Last in, first out: LIFO.'],
 ['一次调用，压入一层上下文。','A call pushes another layer of context.'],
 ['一次返回，回到上一个现场。','A return restores the previous context.'],
 ['撤销、回溯、递归：秩序也可以向后。','Undo. Backtracking. Recursion. Order can run backward.']]],
 ['04 / QUEUE','让先来者，先行','FIRST IN. FIRST FORWARD.','#ffcb77',[
 ['队列，将到达顺序变成服务顺序。','A queue turns arrival order into service order.'],
 ['先进先出：FIFO。','First in, first out: FIFO.'],
 ['尾部入队，头部出队。','Enqueue at the tail. Dequeue at the head.'],
 ['广度优先搜索，一层一层探索未知。','Breadth-first search explores one layer at a time.'],
 ['当生产快于消费，排队就成为延迟。','When production outpaces consumption, queues become latency.']]],
 ['05 / HASH TABLE','从名字，到位置','A KEY BECOMES A PLACE','#6fffc6',[
 ['哈希函数，把键映射到桶。','A hash function maps a key to a bucket.'],
 ['理想的分布，让查找平均接近 O(1)。','Good distribution enables expected O(1) lookup.'],
 ['不同的键，也可能落入同一个桶。','Different keys can land in the same bucket.'],
 ['冲突必须处理，扩容也有成本。','Collisions need a strategy. Resizing has a cost.'],
 ['平均很快，不意味着最坏情况也很快。','Fast on average does not mean fast in the worst case.']]],
 ['06 / TREE','把选择，逐层缩小','DIVIDE THE POSSIBILITY','#b9ff81',[
 ['树，将关系组织成层次。','A tree organizes relationships into a hierarchy.'],
 ['二叉搜索树，让比较决定向左还是向右。','A binary search tree turns comparison into direction.'],
 ['保持平衡，查找路径可缩短到 O(log n)。','With balance, search paths can be O(log n).'],
 ['失去平衡，树也可能退化成一条链。','Without balance, a tree can degenerate into a chain.'],
 ['层次的力量，来自持续维护的约束。','The power of hierarchy comes from maintained invariants.']]],
 ['07 / GRAPH','万物，皆有联系','EVERYTHING IS CONNECTED','#7ea6ff',[
 ['当关系不再是一条线，也不再是一棵树。','When relationships are neither a line nor a tree.'],
 ['顶点与边，构成网络。','Vertices and edges form a network.'],
 ['道路、依赖、社交：同一种抽象。','Roads. Dependencies. Social ties. One abstraction.'],
 ['遍历让连接可见，路径让距离可计算。','Traversal reveals connections. Paths make distance computable.'],
 ['图不只记录世界，也让我们探索世界。','Graphs do not just record the world. They let us explore it.']]],
 ['08 / TRADE-OFF','没有万能，只有取舍','EVERY CHOICE HAS A COST','#ffaf7e',[
 ['同一份数据，可以拥有不同的组织方式。','The same data can take different forms.'],
 ['时间、空间、局部性、维护成本。','Time. Space. Locality. Maintenance.'],
 ['大 O 描述增长趋势，不是实际耗时。','Big O describes growth, not elapsed time.'],
 ['读多还是写多？数据多大？操作是什么？','Read-heavy or write-heavy? How much data? Which operations?'],
 ['最好的结构，来自对问题的深刻理解。','The best structure begins with understanding the problem.']]],
 ['FINALE','构建，可能性','STRUCTURE THE POSSIBLE','#c2b0ff',[
 ['数组赋予位置，链表赋予连接。','Arrays give position. Linked lists give connection.'],
 ['栈保存来路，队列安排前行。','Stacks remember the way back. Queues arrange the way forward.'],
 ['哈希加速抵达，树缩小选择，图连接世界。','Hashes locate. Trees narrow. Graphs connect.'],
 ['算法决定如何前进，结构决定如何组织。','Algorithms decide how to proceed. Structures decide how to organize.'],
 ['理解结构，创造可能。','Understand structure. Create possibility.']]]
];
