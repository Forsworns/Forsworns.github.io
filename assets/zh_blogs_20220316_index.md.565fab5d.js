import{_ as s,c as n,o as a,e}from"./app.bbbac65d.js";const l="/assets/v2-ecfef5caf01b95cc40c6e37e69dd48f2_720w.c067c234.jpg",y=JSON.parse('{"title":"转载：virtio详细介绍和1.1新功能","description":"之前做 IPCC 看过 virtio 相关内容，最近在 DPU 上看到又忘了 orz","frontmatter":{"title":"转载：virtio详细介绍和1.1新功能","description":"之前做 IPCC 看过 virtio 相关内容，最近在 DPU 上看到又忘了 orz","tags":["转载","虚拟化"]},"headers":[{"level":2,"title":"virtio详细介绍","slug":"virtio详细介绍","link":"#virtio详细介绍","children":[]},{"level":2,"title":"基本要素","slug":"基本要素","link":"#基本要素","children":[]},{"level":2,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":2,"title":"承载","slug":"承载","link":"#承载","children":[]},{"level":2,"title":"设备分类","slug":"设备分类","link":"#设备分类","children":[]},{"level":2,"title":"举例分析","slug":"举例分析","link":"#举例分析","children":[]},{"level":2,"title":"virtio1.1新功能","slug":"virtio1-1新功能","link":"#virtio1-1新功能","children":[]},{"level":2,"title":"实现情况","slug":"实现情况","link":"#实现情况","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"zh/blogs/20220316/index.md"}'),p={name:"zh/blogs/20220316/index.md"},i=e('<nav class="table-of-contents"><ul><li><a href="#virtio详细介绍">virtio详细介绍</a></li><li><a href="#基本要素">基本要素</a></li><li><a href="#初始化">初始化</a></li><li><a href="#承载">承载</a></li><li><a href="#设备分类">设备分类</a></li><li><a href="#举例分析">举例分析</a></li><li><a href="#virtio1-1新功能">virtio1.1新功能</a></li><li><a href="#实现情况">实现情况</a></li><li><a href="#总结">总结</a></li></ul></nav><p>最近在看一些虚拟化相关的东西，转载下一则专栏中 <a href="https://www.zhihu.com/column/huiweics" target="_blank" rel="noreferrer">虚拟化笔记</a> 的文章，侵删</p><p>在知乎上看到的文章，然后发现曹钦翔老师也关注了作者= =</p><h1 id="virtio详细介绍和1-1新功能" tabindex="-1"><a href="https://zhuanlan.zhihu.com/p/361918197" target="_blank" rel="noreferrer">virtio详细介绍和1.1新功能</a> <a class="header-anchor" href="#virtio详细介绍和1-1新功能" aria-hidden="true">#</a></h1><p>virtio是一种实践出来的技术，并且最终标准化，virtio是一种通用的虚拟化设备模拟标准，得到了大部分guest操作系统和hypervisor的支持，方便guest操作系统和hypervisor之间任意互相匹配。virtio出现之前hypervisor各有各的IO设备模拟方案，并在guest操作系统中大量合入驱动代码，导致一片混乱，后来xen中出来了部分virtio思想，在kvm中实现并且发扬光大，发表了论文《virtio: Towards a De-Facto Standard For Virtual I/O Devices》，论文促使virtio形成了正式标准。virtio标准最早是0.9.5版本(Virtio PCI Card Specification Version 0.9.5)，于2012年形成了draft，并没有正式发布，继续发展，2016年发布了1.0版本(Virtual I/O Device (VIRTIO) Version 1.0)，2019年发布了1.1版本(Virtual I/O Device (VIRTIO) Version 1.1)。</p><h2 id="virtio详细介绍" tabindex="-1">virtio详细介绍 <a class="header-anchor" href="#virtio详细介绍" aria-hidden="true">#</a></h2><p>virtio分为driver和device，driver部分运行于guest操作系统中，device部分运行于hypervisor中，driver和device是生产者和消费者模式动作，driver生产内存，device消费内存。不同virtio版本之间是互相兼容的，driver和device版本不同也可以互相运转。</p><h2 id="基本要素" tabindex="-1">基本要素 <a class="header-anchor" href="#基本要素" aria-hidden="true">#</a></h2><p><img src="'+l+`" alt=""></p><ul><li>device status field</li></ul><p>driver发现了device，driver可以正常驱动device，driver或者device出错了，driver或者device要进行reset。</p><ul><li>device feature bit</li></ul><p>driver和device协商feature以便于不同virtio版本之间兼容。</p><ul><li>notification</li></ul><p>driver和device互通通知对方，driver生产好的内存要通知device去消费，device消费完了要通知driver回收内存。</p><p>driver通知deivce用doorbell机制，在kvm中是写寄存器，kvm进行拦截再通知vhost。</p><p>device通知driver用中断机制，在kvm中是中断注入。</p><ul><li>config space</li></ul><p>典型的如virtio-net-device的MAC地址/MTU/最大支持队列数等。</p><ul><li>virtqueue</li></ul><p>每个virtqueue分成这三部分，descriptor/available/used，descriptor/available/used就是三个大数组，descriptor数组内容存放真正东西，available和used数组内容存放descriptor数组的下标。driver生产内存，把生产的内存地址和长度写在descriptor，然后把descriptor数据下标写到available数组中，通知device，device消费内存，消费完再把descriptor的数据下标定到used数组中，通知driver进行内存回收。</p><p>chained descriptor，几个desciptor项连在一起，适用于scater-gather。</p><p>indirect descriptor，主descriptor中一项指向另一个descriptor数组。</p><p>一般设备的virtqueue基本可以分三类rx virtqueue/tx virtqueue/ctrl virtqueue，rx virtqueue和tx virtqueue用于进行IO，driver通过ctrl virtqueue控制device。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">/* Virtio ring descriptors: 16 bytes.  These can chain together via &quot;next&quot;. */</span></span>
<span class="line"><span style="color:#A6ACCD;">struct vring_desc {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Address (guest-physical). */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio64 addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Length. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio32 len;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* The flags as indicated above. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* We chain unused descriptors via this, too */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 next;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">struct vring_avail {</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 ring[];</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/* uint32_t is used here for ids for padding reasons. */</span></span>
<span class="line"><span style="color:#A6ACCD;">struct vring_used_elem {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Index of start of used descriptor chain. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio32 id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Total length of the descriptor chain which was used (written to) */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio32 len;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">typedef struct vring_used_elem __attribute__((aligned(VRING_USED_ALIGN_SIZE)))</span></span>
<span class="line"><span style="color:#A6ACCD;">    vring_used_elem_t;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">struct vring_used {</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    vring_used_elem_t ring[];</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>used和avaible不一样是因为rx时，device给driver写数据，device写多少长度数据要给driver反回去。</p><h2 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-hidden="true">#</a></h2><p>device准备，driver发现device，状态更新和feature协商，driver分配virtqueue，把virtqueue地址告诉device。</p><h2 id="承载" tabindex="-1">承载 <a class="header-anchor" href="#承载" aria-hidden="true">#</a></h2><p>首先virtio设备是IO设备，IO设备得以某种方式和CPU内存联结在一起，IO设备还得以某种方式和内存交互数据，IO设备还得提供一种机制让CPU控制IO设备。</p><p>virtio标准中有三种承载机制，分别是pci,mmio和channel i/o，pci是最通用的计算机bus，qemu和kvm能很好的模拟pci bus，mmio主要用于嵌入式设备，这些设备没有pci bus，channel i/o用于一些IBM机器，很少见。这里以最常见的pci来说，它的作用就是让driver正常发现device，让driver有方法控制device，如写pci配置空间，写pci bar空间。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">typedef struct VirtIOPCIRegion {</span></span>
<span class="line"><span style="color:#A6ACCD;">    MemoryRegion mr;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t offset;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t size;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t type;</span></span>
<span class="line"><span style="color:#A6ACCD;">} VirtIOPCIRegion;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">typedef struct VirtIOPCIQueue {</span></span>
<span class="line"><span style="color:#A6ACCD;">  uint16_t num;</span></span>
<span class="line"><span style="color:#A6ACCD;">  bool enabled;</span></span>
<span class="line"><span style="color:#A6ACCD;">  uint32_t desc[2];</span></span>
<span class="line"><span style="color:#A6ACCD;">  uint32_t avail[2];</span></span>
<span class="line"><span style="color:#A6ACCD;">  uint32_t used[2];</span></span>
<span class="line"><span style="color:#A6ACCD;">} VirtIOPCIQueue;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">struct VirtIOPCIProxy {</span></span>
<span class="line"><span style="color:#A6ACCD;">    PCIDevice pci_dev;</span></span>
<span class="line"><span style="color:#A6ACCD;">    MemoryRegion bar;</span></span>
<span class="line"><span style="color:#A6ACCD;">    union {</span></span>
<span class="line"><span style="color:#A6ACCD;">        struct {</span></span>
<span class="line"><span style="color:#A6ACCD;">            VirtIOPCIRegion common;</span></span>
<span class="line"><span style="color:#A6ACCD;">            VirtIOPCIRegion isr;</span></span>
<span class="line"><span style="color:#A6ACCD;">            VirtIOPCIRegion device;</span></span>
<span class="line"><span style="color:#A6ACCD;">            VirtIOPCIRegion notify;</span></span>
<span class="line"><span style="color:#A6ACCD;">            VirtIOPCIRegion notify_pio;</span></span>
<span class="line"><span style="color:#A6ACCD;">        };</span></span>
<span class="line"><span style="color:#A6ACCD;">        VirtIOPCIRegion regs[5];</span></span>
<span class="line"><span style="color:#A6ACCD;">    };</span></span>
<span class="line"><span style="color:#A6ACCD;">    MemoryRegion modern_bar;</span></span>
<span class="line"><span style="color:#A6ACCD;">    MemoryRegion io_bar;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t legacy_io_bar_idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t msix_bar_idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t modern_io_bar_idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t modern_mem_bar_idx;</span></span>
<span class="line"><span style="color:#A6ACCD;">    int config_cap;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">    bool disable_modern;</span></span>
<span class="line"><span style="color:#A6ACCD;">    bool ignore_backend_features;</span></span>
<span class="line"><span style="color:#A6ACCD;">    OnOffAuto disable_legacy;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t class_code;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t nvectors;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t dfselect;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t gfselect;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t guest_features[2];</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIOPCIQueue vqs[VIRTIO_QUEUE_MAX];</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIOIRQFD *vector_irqfd;</span></span>
<span class="line"><span style="color:#A6ACCD;">    int nvqs_with_notifiers;</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtioBusState bus;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>VirtIOPCIProxy存储virtio信息，kvm给guest注册了很多memory region，driver写这些memory region，kvm拦截，把写的值放在VirtIOPCIProxy中。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">static void virtio_pci_modern_regions_init(VirtIOPCIProxy *proxy,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                           const char *vdev_name)</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    static const MemoryRegionOps common_ops = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        .read = virtio_pci_common_read,</span></span>
<span class="line"><span style="color:#A6ACCD;">        .write = virtio_pci_common_write,</span></span>
<span class="line"><span style="color:#A6ACCD;">        .impl = {</span></span>
<span class="line"><span style="color:#A6ACCD;">            .min_access_size = 1,</span></span>
<span class="line"><span style="color:#A6ACCD;">            .max_access_size = 4,</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        .endianness = DEVICE_LITTLE_ENDIAN,</span></span>
<span class="line"><span style="color:#A6ACCD;">    };</span></span>
<span class="line"><span style="color:#A6ACCD;">    g_string_printf(name, &quot;virtio-pci-common-%s&quot;, vdev_name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    memory_region_init_io(&amp;proxy-&gt;common.mr, OBJECT(proxy),</span></span>
<span class="line"><span style="color:#A6ACCD;">                          &amp;common_ops,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          proxy,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          name-&gt;str,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          proxy-&gt;common.size);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">static void virtio_pci_common_write(void *opaque, hwaddr addr,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                    uint64_t val, unsigned size)</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIOPCIProxy *proxy = opaque;</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIODevice *vdev = virtio_bus_get_device(&amp;proxy-&gt;bus);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    switch (addr) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    case VIRTIO_PCI_COMMON_DFSELECT:</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy-&gt;dfselect = val;</span></span>
<span class="line"><span style="color:#A6ACCD;">        break;</span></span>
<span class="line"><span style="color:#A6ACCD;">    case VIRTIO_PCI_COMMON_GFSELECT:</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy-&gt;gfselect = val;</span></span>
<span class="line"><span style="color:#A6ACCD;">        break;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    default:</span></span>
<span class="line"><span style="color:#A6ACCD;">        break;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="设备分类" tabindex="-1">设备分类 <a class="header-anchor" href="#设备分类" aria-hidden="true">#</a></h2><p>virtio分为很多设备类型virtio-net/virtio-blk/virtio-scsi等等，virtqueue实现通用部分，每种设备再实现具体功能部分，可以扩展feature部分，在virtqueue传输的数据中定义自己功能相关标准等。</p><h2 id="举例分析" tabindex="-1">举例分析 <a class="header-anchor" href="#举例分析" aria-hidden="true">#</a></h2><p>以qemu中实现的virtio-net-pci举例来说</p><p>首先它是一个virtio-net类型设备，其次它承载在pci上，所以VirtIONetPCI就把两者结合起来了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">struct VirtIONetPCI {</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIOPCIProxy parent_obj;</span></span>
<span class="line"><span style="color:#A6ACCD;">    VirtIONet vdev;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>virtqueue实现了数据共享，它并不关心到底是网络还是存储数据，所以要在它的buf最前面加上设备类型自己的元数据头，virtio-net-pci用了virtio_net_hdr。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">/* This header comes first in the scatter-gather list.</span></span>
<span class="line"><span style="color:#A6ACCD;"> * For legacy virtio, if VIRTIO_F_ANY_LAYOUT is not negotiated, it must</span></span>
<span class="line"><span style="color:#A6ACCD;"> * be the first element of the scatter-gather list.  If you don&#39;t</span></span>
<span class="line"><span style="color:#A6ACCD;"> * specify GSO or CSUM features, you can simply ignore the header. */</span></span>
<span class="line"><span style="color:#A6ACCD;">struct virtio_net_hdr {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* See VIRTIO_NET_HDR_F_* */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint8_t flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* See VIRTIO_NET_HDR_GSO_* */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint8_t gso_type;</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 hdr_len;     /* Ethernet + IP + tcp/udp hdrs */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 gso_size;        /* Bytes to append to hdr_len per frame */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 csum_start;  /* Position to start checksumming from */</span></span>
<span class="line"><span style="color:#A6ACCD;">    __virtio16 csum_offset; /* Offset after that to place checksum */</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>再看virtio-net-pci ctrl virtqueue传输的数据内容，基本就是打开网卡混杂模式/修改MAC/virtqueue个数/配置rss/配置offload等。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Control virtqueue data structures</span></span>
<span class="line"><span style="color:#A6ACCD;"> *</span></span>
<span class="line"><span style="color:#A6ACCD;"> * The control virtqueue expects a header in the first sg entry</span></span>
<span class="line"><span style="color:#A6ACCD;"> * and an ack/status response in the last entry.  Data for the</span></span>
<span class="line"><span style="color:#A6ACCD;"> * command goes in between.</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">struct virtio_net_ctrl_hdr {</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint8_t class;</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint8_t cmd;</span></span>
<span class="line"><span style="color:#A6ACCD;">} QEMU_PACKED;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="virtio1-1新功能" tabindex="-1">virtio1.1新功能 <a class="header-anchor" href="#virtio1-1新功能" aria-hidden="true">#</a></h2><p>virtio 1.0存在的问题第一是性能不高，第二是硬件不太好实现。</p><p>driver和device运行在不同的cpu，driver和device共享内存，存在不同cpu之间互相通知进行cache刷新的问题，virtio1.0 virtqueue分成三个数组，三个数组分布在不同的cacheline上需要多次cache刷新，所以virtio 1.1引入了packed ring，把virtio 1.0中的三个数组合并成一个，这样大大减少了cache刷新的次数。具体做法就是packed virtqueue把available和used当成descriptor中flag字段两个bit，driver本地存放一个driver_local_bit，把available_bit=driver_local_bit和used_bit=!driver_local_bit，device本地存放一个device_local_bit，消费完内存后used_bit=device_local_bit。</p><p>通知是有开销的，virtio1.1 batch和in-order减少driver和device互相通知对方的次数，batch就是driver一次多生产几块内存，再通知device，in-order就是device按driver生产内存的顺序消费内存，消费完后只通知driver最后一块内存可以回收了，因为严格按顺序消费的，driver由此可知前面的内存也已经消费完了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">struct vring_packed_desc {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Buffer Address. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint64_t addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Buffer Length. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint32_t len;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* Buffer ID. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint16_t id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* The flags depending on descriptor type. */</span></span>
<span class="line"><span style="color:#A6ACCD;">    uint16_t flags;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>硬件实现也一样，driver写descriptor发现一次pci传输，写available数组又要发现一次pci传输，如果把descriptor和available数组合并只要一次pci传输即可。</p><h2 id="实现情况" tabindex="-1">实现情况 <a class="header-anchor" href="#实现情况" aria-hidden="true">#</a></h2><p>linux 4.18 virtio-net driver已经能支持virtio 1.1了，但vhost-net不支持virtio 1.1。</p><p>qemu master实现了virtio 1.1。</p><p>dpdk virtio pmd和vhost-user都支持virtio 1.1。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><p>virtio标准还会继续发展，功能会越来越多，设备类型会越来越多，如virtio GPU和virtio vIOMMU，GPU最难虚拟化，目前用的是mdev，没有IOMMU，virtio设备可以修改任意guest内存，有vIOMMU更安全，vIOMMU也可以用vt-d实现，virtio device emulation可以在qemu/kernel/dpdk中实现，virtio技术百花齐放，创新不断，是做虚拟化必须研究的技术。总结virtio的目标就是统一IO设备，虚拟机看到的所有的外设都是virtio类型，只需要安装virtio类型的驱动即可，如果硬件也能实现virtio，那么裸金属也一样了，虚拟机和裸金属互相热迁移，一个镜像走天下。</p>`,56),t=[i];function r(o,c,C,A,d,v){return a(),n("div",null,t)}const _=s(p,[["render",r]]);export{y as __pageData,_ as default};
