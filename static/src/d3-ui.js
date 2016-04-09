/******* Tabs *********/
d3.selectAll('.tabs li').on('click', function() {
    selectTab(d3.select(this));
});
function selectTab(node){
    var id = node.attr('data-tab');
    d3.select(node.node().parentNode).selectAll('li.active').classed('active', false);
    node.classed('active', true);

    // select all tabs in same container as our target, and toggle visibility
    var parentNode = d3.select('#' + id).node().parentNode;
    d3.select(parentNode)
        .selectAll('.tab')
        .filter(function(){ return this.parentNode == parentNode })
        .classed('hidden', function(d){
            return d3.select(this).attr('id') != id;
        });
}

/******* Open / Close buttons *********/
d3.selectAll('.button-open').on('click', function() {
    var ids = d3.select(this).attr('data-target').split(' ');
    ids.forEach(function(id){
        d3.select('#' + id).classed('hidden', false);
    });
});
d3.selectAll('.button-close').on('click', function() {
    var ids = d3.select(this).attr('data-target').split(' ');
    ids.forEach(function(id){
        d3.select('#' + id).classed('hidden', true);
    });
});
